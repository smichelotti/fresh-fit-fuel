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

namespace FreshFitFuel.Api.Menus
{
    public class GetMenus
    {
        private TableStorageContext db;
        private IMapper mapper;

        public GetMenus(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("GetMenus")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menus")] HttpRequest req, 
            ILogger log)
        {
            log.LogInformation("Get Menus");
            var m = this.db.Menus.Query<Menu>("PartitionKey eq 'default'");
            var items = this.mapper.Map<List<MenuInfo>>(m);
            return new OkObjectResult(items.OrderByDescending(x => x.StartTime));
        }

        public class MenuInfo
        {
            [JsonProperty("id")]
            public string RowKey { get; set; } = Guid.NewGuid().ToString();
            public string Name { get; set; }
            public DateTimeOffset StartTime { get; set; }
            public DateTimeOffset EndTime { get; set; }
            public string[] MenuItemIds { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<Menu, MenuInfo>()
                    .ForMember(dest => dest.MenuItemIds, opt => opt.MapFrom(src => (src.MenuItemIds).Split(',', StringSplitOptions.None)));
            }
        }

    }
}
