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

namespace FreshFitFuel.Api.MenuItems
{
    public class InsertMenuItem
    {
        private TableStorageContext db;
        private IMapper mapper;

        public InsertMenuItem(TableStorageContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("InsertMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "menu-items")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Insert Menu Item");
            var json = await req.ReadAsStringAsync();
            var cmd = JsonConvert.DeserializeObject<MenuItemCommand>(json);
            var item = this.mapper.Map<MenuItem>(cmd);
            await this.db.MenuItems.AddEntityAsync(item);
            return new OkObjectResult(new { id = item.RowKey });
        }

        public class MenuItemCommand
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public int Carbs { get; set; }
            public int Protein { get; set; }
            public int Fat { get; set; }
            public int Calories { get; set; }
            public string ImageUrl { get; set; }
            public string Category { get; set; }
            public int ItemCap { get; set; }
            public double Price { get; set; }
            public List<PriceOption> PriceOptions { get; set; }

            public class PriceOption
            {
                public string Label { get; set; }
                public double PriceAdj { get; set; }
            }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<MenuItemCommand, MenuItem>()
                    .ForMember(dest => dest.PriceOptionsJson, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.PriceOptions)));
            }
        }
    }
}
