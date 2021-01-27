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
    public class UpdateMenu
    {
        private TableStorageContext db;
        private IMapper mapper;

        public UpdateMenu(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("UpdateMenu")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "menus/{id}")] HttpRequest req, 
            ILogger log)
        {
            log.LogInformation("Update Menu");
            var json = await req.ReadAsStringAsync();
            var cmd = JsonConvert.DeserializeObject<MenuInfo>(json);
            var item = this.mapper.Map<Menu>(cmd);
            await this.db.Menus.UpdateItem(item);
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
                this.CreateMap<MenuInfo, Menu>()
                    .ForMember(dest => dest.MenuItemIds, opt => opt.MapFrom(src => string.Join(",", src.MenuItemIds)));
            }
        }

    }
}
