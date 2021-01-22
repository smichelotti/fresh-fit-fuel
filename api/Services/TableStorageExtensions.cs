using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Azure;
using Azure.Data.Tables;
using FreshFitFuel.Api.Models;

namespace FreshFitFuel.Api.Services
{
    public static class TableStorageExtensions
    {
        private static IMapper mapper = new MapperConfiguration(cfg => {}).CreateMapper();

        public static TableEntity ToTableEntity<T>(this T item) where T : IItem
        {
            var mappedTableEntity = mapper.Map<Dictionary<string, object>>(item);
            var entity = new TableEntity(mappedTableEntity);
            entity.RowKey = item.Id ?? Guid.NewGuid().ToString();
            entity.PartitionKey = "default";
            return entity;
        }

        public static T FromTableEntity<T>(this Azure.Data.Tables.TableEntity entity) where T : IItem
        {
            var item = mapper.Map<T>(entity);
            item.Id = entity.RowKey;
            return item;
        }

        public static List<T> FromTableEntities<T>(this IEnumerable<TableEntity> entities) where T : IItem =>
            entities.Select(x => x.FromTableEntity<T>()).ToList();

        public async static Task<T> GetItemById<T>(this TableClient tableClient, string id) where T : IItem
        {
            var entity = await tableClient.GetEntityAsync<TableEntity>(partitionKey: Constants.DefaultPartitionKey, rowKey: id);
            return entity.Value.FromTableEntity<T>();
        }

        public async static Task<T> AddItem<T>(this TableClient tableClient, T item) where T : IItem
        {
            var entity = item.ToTableEntity();
            await tableClient.AddEntityAsync(entity);
            item.Id = entity.RowKey;
            return item;
        }

        public async static Task<T> UpdateItem<T>(this TableClient tableClient, T item) where T : IItem
        {
            var entity = item.ToTableEntity();
            await tableClient.UpdateEntityAsync(entity, ETag.All);
            return item;
        }
    }
}
