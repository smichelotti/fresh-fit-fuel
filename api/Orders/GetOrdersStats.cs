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

namespace FreshFitFuel.Api.Orders
{
    public class GetOrdersStats
    {
        private TableStorageContext db;
        private IMapper mapper;

        public GetOrdersStats(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("GetOrdersStats")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "orders-stats")] HttpRequest req, ILogger log)
        {
            var menuId = req.Query["menuid"];
            var orders = this.db.Orders.Query<Order>(
                filter: $"PartitionKey eq 'default' and MenuId eq '{menuId}'",
                select: new[] { "MenuItemsJson" });
            var items = this.mapper.Map<List<StatResult>>(orders);

            var results = items.SelectMany(x => x.LineItems)
                               .GroupBy(x => x.MenuItemId)
                               .Select(grp => new { 
                                   MenuItemId = grp.Key,
                                   Name = TrimOptions(grp.First().Name),
                                   Count = grp.Sum(x => x.Quantity),
                                   Options = grp.GroupBy(x => x.Name)
                                                .Select(optGrp => new { Name = optGrp.Key, Count = optGrp.Sum(x => x.Quantity) })
                                                .OrderBy(x => x.Name)
                               })
                               .OrderBy(x => x.Name)
                               .ToList();

            return new OkObjectResult(results);
        }

        private static string TrimOptions(string input)
        {
            var idx = input.IndexOf(" - ");
            return input.Substring(0, idx == -1 ? input.Length : idx);
        }

        public class StatResult
        {
            public List<LineItem> LineItems { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<Order, StatResult>()
                    .ForMember(dest => dest.LineItems, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<List<LineItem>>(src.MenuItemsJson)));
            }
        }
    }
}
