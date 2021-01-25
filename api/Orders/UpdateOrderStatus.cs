using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure;
using Azure.Data.Tables;
using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Orders
{
    public class UpdateOrderStatus
    {
        private TableStorageContext db;

        public UpdateOrderStatus(TableStorageContext db) => this.db = db;

        [FunctionName("UpdateOrderStatus")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "orders/{id}/status")] HttpRequest req, string id, ILogger log)
        {
            var json = await req.ReadAsStringAsync();
            var cmd = JsonConvert.DeserializeObject<UpdateOrderStatusCommand>(json);
            var tableEntity = new TableEntity(partitionKey: Constants.DefaultPartitionKey, rowKey: id)
            {
                ["OrderStatus"] = cmd.OrderStatus.ToString()
            };
            await db.Orders.UpdateEntityAsync(tableEntity, ETag.All, TableUpdateMode.Merge);
            return new OkObjectResult(cmd);
        }

        public class UpdateOrderStatusCommand
        {
            public OrderStatus OrderStatus { get; set; }
        }
    }
}
