using System.Collections.Generic;
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
    public class GetOrders
    {
        private TableStorageContext db;
        private IMapper mapper;

        public GetOrders(TableStorageContext db, IMapper mapper) 
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("GetOrders")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "orders")] HttpRequest req, ILogger log)
        {
            log.LogInformation("Get Orders.");
            // TODO: eventually will need to provide filters for active/complete, etc.
            var orders = this.db.Orders.Query<Order>(filter: "PartitionKey eq 'default'", select: new[] { "RowKey", "FullName", "OrderStatus", "GrandTotal" });
            var items = this.mapper.Map<List<AdminOrderResult>>(orders);
            return new OkObjectResult(items);
        }

        public class AdminOrderResult
        {
            public string Id { get; set; }
            public double GrandTotal { get; set; }
            public string FullName { get; set; }
            public OrderStatus OrderStatus { get; set; }
        }
        
        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<Order, AdminOrderResult>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RowKey));
            }
        }
    }
}
