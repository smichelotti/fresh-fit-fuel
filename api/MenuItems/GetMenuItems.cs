using System.Data;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;
using FreshFitFuel.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FreshFitFuel.Api.MenuItems
{
    public class GetMenuItems
    {
        private IDbConnection db;

        public GetMenuItems(IDbConnection db) => this.db = db;
        
        [FunctionName("GetMenuItems")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu-items")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get Menu Items.");
            var items = await this.db.GetAllAsync<MenuItem>();
            return new OkObjectResult(items);
        }
    }
}
