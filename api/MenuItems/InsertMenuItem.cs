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
    public class InsertMenuItem
    {
        private IDbConnection db;

        public InsertMenuItem(IDbConnection db) => this.db = db;

        [FunctionName("InsertMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "menu-items")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Insert Menu Item");
            var json = await req.ReadAsStringAsync();
            var item = JsonConvert.DeserializeObject<MenuItem>(json);
            var id = await this.db.InsertAsync(item);
            item.Id = (int)id;
            return new OkObjectResult(item);
        }
    }
}
