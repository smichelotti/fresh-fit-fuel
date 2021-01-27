using System;
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

namespace FreshFitFuel.Api.Menus
{
    public class GetMenu
    {
        private TableStorageContext db;
        private IMapper mapper;

        public GetMenu(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("GetMenu")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menus/{id}")] HttpRequest req, string id,
            ILogger log)
        {
            log.LogInformation($"Get Menu - {id}");
            var m = await this.db.Menus.GetItemById<Menu>(id);
            var item = this.mapper.Map<MenuInfo>(m);
            return new OkObjectResult(item);
        }

        public class MenuInfo
        {
            [JsonProperty("id")]
            public string RowKey { get; set; } = Guid.NewGuid().ToString();
            public string Name { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
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
