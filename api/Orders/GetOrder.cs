using System;
using System.Collections.Generic;
using System.Threading;
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
    public class GetOrder
    {
        private TableStorageContext db;
        private IMapper mapper;

        public GetOrder(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        
        [FunctionName("GetOrder")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "orders/{id}")] HttpRequest req, string id, ILogger log)
        {
            log.LogInformation($"Get Order - {id}");
            //Thread.Sleep(3000);
            var order = await this.db.Orders.GetItemById<Order>(id);
            var item = this.mapper.Map<AdminOrderResult>(order);
            return new OkObjectResult(item);
        }

        public class AdminOrderResult
        {
            public string Id { get; set; }
            public List<LineItem> LineItems { get; set; } = new List<LineItem>();
            public OrderStatus OrderStatus { get; set; }
            public string OrderNumber { get; set; }
            public double GrandTotal { get; set; }
            public string FullName { get; set; }
            public string Email { get; set; }
            public string VenmoHandle { get; set; }
            public string DistributionMethod { get; set; }

            public string StreetAddress { get; set; }
            public string City { get; set; }
            public string ZipCode { get; set; }
            public DateTimeOffset OrderSubmitted { get; set; }
        }

        public class LineItem
        {
            public string MenuItemId { get; set; }
            public string Name { get; set; }
            public int Quantity { get; set; }
            public double Price { get; set; }
            public double SubTotal { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<Order, AdminOrderResult>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RowKey))
                    .ForMember(dest => dest.LineItems, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<List<LineItem>>(src.MenuItemsJson)));
            }
        }
    }
}
