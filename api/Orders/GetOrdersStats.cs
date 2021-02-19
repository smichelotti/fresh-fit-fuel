using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
                               .GroupBy(x => x.Name)
                               .Select(grp => new { Item = grp.Key, Count = grp.Sum(x => x.Quantity) })
                               .OrderBy(x => x.Item)
                               .ToList();

            return new OkObjectResult(results);
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
