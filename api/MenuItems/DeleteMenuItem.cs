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
    public class DeleteMenuItem
    {
        private TableStorageContext db;

        public DeleteMenuItem(TableStorageContext db) => this.db = db;

        [FunctionName("DeleteMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "menu-items/{id}")] HttpRequest req, string id,
            ILogger log)
        {
            log.LogInformation("Delete Menu Item");
            await this.db.MenuItems.DeleteEntityAsync(partitionKey: Constants.DefaultPartitionKey, rowKey: id);
            return new NoContentResult();
        }
    }
}
