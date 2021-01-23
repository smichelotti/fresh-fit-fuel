using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FreshFitFuel.Api.Customer
{
    public class CurrentMenu
    {
        private TableStorageContext db;

        public CurrentMenu(TableStorageContext db) => this.db = db;

        [FunctionName("GetCustomerCurrentMenu")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "customer/current-menu")] HttpRequest req, ILogger log)
        {
            log.LogInformation("Customer current menu.");
            // TODO: this need to change once we implement functionality to specify which menu is "active"
            var items = this.db.MenuItems.Query<MenuItem>("PartitionKey eq 'default'");
            return new OkObjectResult(items);
        }
    }
}
