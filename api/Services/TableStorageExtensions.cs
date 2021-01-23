using System.Threading.Tasks;
using Azure;
using Azure.Data.Tables;
using FreshFitFuel.Api.Models;

namespace FreshFitFuel.Api.Services
{
    public static class TableStorageExtensions
    {
        public async static Task<T> GetItemById<T>(this TableClient tableClient, string id) where T : class, ITableEntity, new()
        {
            var response = await tableClient.GetEntityAsync<T>(partitionKey: Constants.DefaultPartitionKey, rowKey: id);
            return response.Value;
        }

        public async static Task UpdateItem<T>(this TableClient tableClient, T item) where T : class, ITableEntity, new() =>
            await tableClient.UpdateEntityAsync(item, ETag.All);
    }
}
