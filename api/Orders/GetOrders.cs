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
            var orders = this.db.Orders.Query<Order>("PartitionKey eq 'default'");
            var items = this.mapper.Map<List<CustomerOrderResult>>(orders);
            return new OkObjectResult(items);
        }

        public class CustomerOrderResult
        {
            public List<LineItem> LineItems { get; set; } = new List<LineItem>();
            public double GrandTotal { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string VenmoHandle { get; set; }
            public string DistributionMethod { get; set; }

            public string StreetAddress { get; set; }
            public string City { get; set; }
            public string ZipCode { get; set; }

            public class LineItem
            {
                public string MenuItemId { get; set; }
                public int Quantity { get; set; }
                public double SubTotal { get; set; }
            }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<Order, CustomerOrderResult>()
                    .ForMember(dest => dest.LineItems, opt => opt.MapFrom(src => JsonConvert.DeserializeObject(src.MenuItemsJson)));
            }
        }
    }
}
