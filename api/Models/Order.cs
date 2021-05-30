using System;
using Azure;
using Azure.Data.Tables;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Models
{
    public class Order : ITableEntity
    {
        [JsonProperty("id")]
        public string RowKey { get; set; } = Guid.NewGuid().ToString();
        public string MenuItemsJson { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public string OrderNumber { get; set; }
        public string MenuId { get; set; } // note: this should really be partition key, but too lazy to fix prod data right now
        public double GrandTotal { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string VenmoHandle { get; set; }
        public string DistributionMethod { get; set; }

        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; } = "MD";
        public string ZipCode { get; set; }
        public string SpecialInstructions { get; set; }
        public DateTimeOffset OrderSubmitted { get; set; } = DateTimeOffset.UtcNow;



        // Just to satisfy ITableEntity
        [JsonIgnore]
        public string PartitionKey { get; set; } = Constants.DefaultPartitionKey;
        [JsonIgnore]
        public DateTimeOffset? Timestamp { get; set; }
        [JsonIgnore]
        public ETag ETag { get; set; }
    }

    public enum OrderStatus
    {
        OrderReceived,
        InvoiceSent,
        PaymentReceived,
        DistributionComplete
    }
}
