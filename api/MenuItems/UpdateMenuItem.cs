using System.Data;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;
using FreshFitFuel.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.MenuItems
{
    public class UpdateMenuItem
    {
        private IDbConnection db;

        public UpdateMenuItem(IDbConnection db) => this.db = db;

        [FunctionName("UpdateMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "menu-items/{id}")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Update Menu Item");
            var json = await req.ReadAsStringAsync();
            var item = JsonConvert.DeserializeObject<MenuItem>(json);
            await this.db.UpdateAsync(item);
            return new OkObjectResult(item);
        }
    }
}
