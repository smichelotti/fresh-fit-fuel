using System;
using Azure;
using Azure.Data.Tables;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Models
{
    public class Menu : ITableEntity
    {
        [JsonProperty("id")]
        public string RowKey { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }
        public string MenuItemIds { get; set; }

        // Just to satisfy ITableEntity
        [JsonIgnore]
        public string PartitionKey { get; set; } = Constants.DefaultPartitionKey;
        [JsonIgnore]
        public DateTimeOffset? Timestamp { get; set; }
        [JsonIgnore]
        public ETag ETag { get; set; }
    }
}
