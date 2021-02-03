using System;
using System.Linq;
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
            var menus = this.db.Menus.Query<Menu>("PartitionKey eq 'default'");
            var currentMenu = menus.Where(x => x.StartTime <= DateTime.UtcNow).OrderByDescending(x => x.StartTime).First();
            var currentMenuItemIds = currentMenu.MenuItemIds.Split(',');
            var predicate = string.Join(" or ", currentMenuItemIds.Select(x => $"RowKey eq '{x}'"));
            log.LogInformation($"*** predicate: {predicate}");
            var menuItems = this.db.MenuItems.Query<MenuItem>($"PartitionKey eq 'default' and ({predicate})").ToDictionary(x => x.RowKey);
            var response = new
            {
                start = currentMenu.StartTime,
                end = currentMenu.EndTime,
                menuItems = currentMenuItemIds.Select(x => menuItems[x])
            };
            return new OkObjectResult(response);
        }
    }
}
