using Azure.Data.Tables;
using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FreshFitFuel.Api.MenuItems
{
    public class GetMenuItems
    {
        private TableStorageContext db;

        public GetMenuItems(TableStorageContext db) => this.db = db;
        
        [FunctionName("GetMenuItems")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu-items")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get Menu Items.");
            var items = this.db.MenuItems.Query<MenuItem>("PartitionKey eq 'default'");
            return new OkObjectResult(items);
        }
    }
}
