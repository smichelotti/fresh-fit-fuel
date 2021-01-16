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
    public class GetMenuItem
    {
        private IDbConnection db;

        public GetMenuItem(IDbConnection db) => this.db = db;

        [FunctionName("GetMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu-items/{id}")] HttpRequest req, int id,
            ILogger log)
        {
            log.LogInformation("Get Menu Item.");
            var item = await this.db.GetAsync<MenuItem>(id);
            return new OkObjectResult(item);
        }
    }
}
