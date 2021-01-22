using System.Threading.Tasks;
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

        public InsertMenuItem(TableStorageContext db) => this.db = db;

        [FunctionName("InsertMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "menu-items")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Insert Menu Item");
            var json = await req.ReadAsStringAsync();
            var item = JsonConvert.DeserializeObject<MenuItem>(json);
            await this.db.MenuItems.AddItem(item);
            return new OkObjectResult(item);
        }
    }
}
