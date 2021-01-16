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
    public class DeleteMenuItem
    {
        private IDbConnection db;

        public DeleteMenuItem(IDbConnection db) => this.db = db;

        [FunctionName("DeleteMenuItem")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "menu-items/{id}")] HttpRequest req, int id,
            ILogger log)
        {
            log.LogInformation("Delete Menu Item");
            await this.db.DeleteAsync(new MenuItem { Id = id });
            return new NoContentResult();
        }
    }
}
