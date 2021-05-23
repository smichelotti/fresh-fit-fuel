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
    public class GetMenuItem
    {
        private TableStorageContext db;
        private IMapper mapper;

        public GetMenuItem(TableStorageContext db, IMapper mapper) 
        {
            this.db = db;
            this.mapper = mapper;
        }

        [FunctionName("GetMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu-items/{id}")] HttpRequest req, string id,
            ILogger log)
        {
            log.LogInformation("Get Menu Item.");
            var item = await this.db.MenuItems.GetItemById<MenuItem>(id);
            var response = this.mapper.Map<MenuItemResponse>(item);
            return new OkObjectResult(response);
        }

        public class MenuItemResponse
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
        }

        public class PriceOption
        {
            public string Label { get; set; }
            public double PriceAdj { get; set; }
        }

        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                this.CreateMap<MenuItem, MenuItemResponse>()
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RowKey))
                    .ForMember(dest => dest.PriceOptions, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<List<PriceOption>>(src.PriceOptionsJson)));
            }
        }
    }
}
