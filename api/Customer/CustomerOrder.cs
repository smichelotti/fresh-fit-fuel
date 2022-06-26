using System;
using System.Collections.Generic;
using System.Linq;
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
        private IEmailClient emailClient;

        public CustomerOrder(TableStorageContext db, IMapper mapper, IEmailClient emailClient) 
        {
            this.db = db;
            this.mapper = mapper;
            this.emailClient = emailClient;
        }

        [FunctionName("InsertCustomerOrder")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "customer/order")] HttpRequest req, ILogger log)
        {
            log.LogInformation("Insert Customer Order");
            var json = await req.ReadAsStringAsync();
            var cmd = JsonConvert.DeserializeObject<CustomerOrderCommand>(json);
            // TODO: need to add validation logic here (e.g., check sub-totals, grand totals haven't been tampered with, etc.)
            var orderEntity = this.mapper.Map<Order>(cmd);
            orderEntity.OrderNumber = OrderNumberGenerator.Generate();
            orderEntity.MenuId = this.GetCurrentMenuId();
            await this.db.Orders.AddEntityAsync(orderEntity);
            await this.emailClient.SendConfirmation(orderEntity);
            return new OkObjectResult(new { orderNumber = orderEntity.OrderNumber });
        }

        private string GetCurrentMenuId()
        {
            var menus = this.db.Menus.Query<Menu>("PartitionKey eq 'default'");
            var currentMenu = menus.Where(x => x.StartTime <= DateTime.UtcNow).OrderByDescending(x => x.StartTime).First();
            return currentMenu.RowKey;
        }

        public class CustomerOrderCommand
        {
            public List<LineItem> LineItems { get; set; } = new List<LineItem>();
            public double GrandTotal { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string VenmoHandle { get; set; }
            public string DistributionMethod { get; set; }
            public string SpecialInstructions { get; set; }

            public string StreetAddress { get; set; }
            public string City { get; set; }
            public string ZipCode { get; set; }
            public string Phone { get; set; }
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
