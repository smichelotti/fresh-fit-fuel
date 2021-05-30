using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Customer
{
    public class CurrentMenu
    {
        private TableStorageContext db;
        private IMapper mapper;

        public CurrentMenu(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("GetCustomerCurrentMenu")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "customer/current-menu")] HttpRequest req, ILogger log)
        {
            log.LogInformation("Customer current menu.");
            var menus = this.db.Menus.Query<Menu>("PartitionKey eq 'default'");
            var currentMenu = menus.Where(x => x.StartTime <= DateTime.UtcNow).OrderByDescending(x => x.StartTime).First();
            var currentMenuItemIds = currentMenu.MenuItemIds.Split(',');
            var predicate = string.Join(" or ", currentMenuItemIds.Select(x => $"RowKey eq '{x}'"));
            var menuItemsDict = this.db.MenuItems.Query<MenuItem>($"PartitionKey eq 'default' and ({predicate})").ToDictionary(x => x.RowKey);
            
            var response = new
            {
                CurrentMenu = new
                {
                    start = currentMenu.StartTime,
                    end = currentMenu.EndTime,
                    menuItems = currentMenuItemIds.Select(x => this.mapper.Map<MenuItemResponse>(menuItemsDict[x]))
                },
                Stats = GetMenuOrderStats(currentMenu.RowKey)
            };
            return new OkObjectResult(response);
        }

        private List<MenuItemStat> GetMenuOrderStats(string menuId)
        {
            var orders = this.db.Orders.Query<Order>(
                filter: $"PartitionKey eq 'default' and MenuId eq '{menuId}'",
                select: new[] { "MenuItemsJson" });
            var items = this.mapper.Map<List<StatResult>>(orders);

            var results = items.SelectMany(x => x.LineItems)
                               .GroupBy(x => x.MenuItemId)
                               .Select(grp => new MenuItemStat { MenuItemId = grp.Key, Count = grp.Sum(x => x.Quantity) })
                               .ToList();
            return results;
        }

        public class StatResult
        {
            public List<LineItem> LineItems { get; set; }
        }

        public class MenuItemStat
        {
            public string MenuItemId { get; set; }
            public int Count { get; set; }
        }

        public class MenuItemResponse
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public int Carbs { get; set; }
            public int Protein { get; set; }
            public int Fat { get; set; }
            public int Calories { get; set; }
            public string ImageUrl { get; set; }
            public string Category { get; set; }
            public int ItemCap { get; set; }
            public double Price { get; set; }
            public List<PriceOption> PriceOptions { get; set; }
        }

        public class PriceOption
        {
            public string Label { get; set; }
            public double PriceAdj { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<MenuItem, MenuItemResponse>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RowKey))
                    .ForMember(dest => dest.PriceOptions, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<List<PriceOption>>(src.PriceOptionsJson)));

                this.CreateMap<Order, StatResult>()
                    .ForMember(dest => dest.LineItems, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<List<LineItem>>(src.MenuItemsJson)));
            }
        }
    }
}
