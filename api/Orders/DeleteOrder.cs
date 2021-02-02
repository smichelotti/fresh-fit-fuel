using System.Threading.Tasks;
using Azure;
using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FreshFitFuel.Api.Orders
{
    public class DeleteOrder
    {
        private readonly TableStorageContext db;

        public DeleteOrder(TableStorageContext db) => this.db = db;
        
        [FunctionName("DeleteOrder")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "orders/{id}")] HttpRequest req, string id, ILogger log)
        {
            log.LogInformation($"Delete Order - {id}");
            await this.db.Orders.DeleteEntityAsync(Constants.DefaultPartitionKey, id, ETag.All);
            return new NoContentResult();
        }
    }
}
