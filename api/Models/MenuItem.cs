using System;
using Azure;
using Azure.Data.Tables;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Models
{
    public class MenuItem : ITableEntity
    {
        [JsonProperty("id")]
        public string RowKey { get; set; } = Guid.NewGuid().ToString();
        //public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Carbs { get; set; }
        public int Protein { get; set; }
        public int Fat { get; set; }
        public int Calories { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }

        // Just to satisfy ITableEntity
        [JsonIgnore]
        public string PartitionKey { get; set; } = Constants.DefaultPartitionKey;
        [JsonIgnore]
        public DateTimeOffset? Timestamp { get; set; }
        [JsonIgnore] 
        public ETag ETag { get; set; }
    }
}
