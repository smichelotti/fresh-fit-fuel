using System.Collections.Generic;
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

namespace FreshFitFuel.Api.Customer
{
    public class CustomerOrder
    {
        private TableStorageContext db;
        private IMapper mapper;

        public CustomerOrder(TableStorageContext db, IMapper mapper) 
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("InsertCustomerOrder")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "customer/order")] HttpRequest req, ILogger log)
        {
            log.LogInformation("Insert Customer Order");
            var json = await req.ReadAsStringAsync();
            var cmd = JsonConvert.DeserializeObject<CustomerOrderCommand>(json);
            // TODO: need to add validation logic here (e.g., check sub-totals, grand totals haven't been tampered with, etc.)
            // TODO: send out confirmation email
            // TODO: generate new "order number"
            var entity = this.mapper.Map<Order>(cmd);
            await this.db.Orders.AddEntityAsync(entity);
            return new OkObjectResult(cmd);
        }

        public class CustomerOrderCommand
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
                public string Name { get; set; }
                public int Quantity { get; set; }
                public double Price { get; set; }
                public double SubTotal { get; set; }
            }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<CustomerOrderCommand, Order>()
                    .ForMember(dest => dest.MenuItemsJson, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.LineItems)));
            }
        }
    }
}
