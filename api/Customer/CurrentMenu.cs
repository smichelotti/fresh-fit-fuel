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
            log.LogInformation($"*** predicate: {predicate}");
            var menuItemsDict = this.db.MenuItems.Query<MenuItem>($"PartitionKey eq 'default' and ({predicate})").ToDictionary(x => x.RowKey);
            var response = new
            {
                start = currentMenu.StartTime,
                end = currentMenu.EndTime,
                menuItems = currentMenuItemIds.Select(x => this.mapper.Map<MenuItemResponse>(menuItemsDict[x]))
            };
            return new OkObjectResult(response);
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
            }
        }
    }
}
