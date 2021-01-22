using System.Threading.Tasks;
using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FreshFitFuel.Api.MenuItems
{
    public class GetMenuItem
    {
        private TableStorageContext db;

        public GetMenuItem(TableStorageContext db) => this.db = db;

        [FunctionName("GetMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu-items/{id}")] HttpRequest req, string id,
            ILogger log)
        {
            log.LogInformation("Get Menu Item.");
            var item = await this.db.MenuItems.GetItemById<MenuItem>(id);
            return new OkObjectResult(item);
        }
    }
}
