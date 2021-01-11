using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace FreshFitFuel.Api
{
    public static class GetMenuItems
    {
        [FunctionName("GetMenuItems")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "menu-items")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var items = new List<MenuItem> {
              new MenuItem { Title = "Honey Mustand Chicken", Description = "Test desc" },
              new MenuItem { Title = "Ground Turkey Delight", Description = "Test desc2" }
            };

            return new OkObjectResult(items);
        }
    }

    public class MenuItem {
      public string Title { get; set; }
      public string Description { get; set; }
    }
}
