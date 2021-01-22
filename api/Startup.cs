using System.Data;
using System.Data.SqlClient;
using AutoMapper;
using Azure.Data.Tables;
using FreshFitFuel.Api.Models;
using FreshFitFuel.Api.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(FreshFitFuel.Api.Startup))]

namespace FreshFitFuel.Api
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddTransient<ServiceFactory>();
            //builder.Services.AddScoped<IDbConnection>(x => {
            //    var config = x.GetService<IConfiguration>();
            //    return new SqlConnection(config["fff-conn-string"]);
            //});
            //builder.Services.AddAutoMapper(typeof(Startup));
            //builder.Services.AddScoped<CloudStorageAccount>(p => p.GetService<ServiceFactory>().CreateCloudStorageAccount());
            //builder.Services.AddScoped<CloudTableClient>(p => p.GetService<ServiceFactory>().CreateCloudTableClient());
            //builder.Services.AddScoped<TableClient>(p => p.GetService<ServiceFactory>().CreateTableClient("menuitems"));
            //builder.Services.AddScoped<TableClient>(p => p.GetService<ServiceFactory>().CreateTableClient("menus"));
            //builder.Services.AddScoped<TableClient>(p => p.GetService<ServiceFactory>().CreateTableClient("orders"));
            //builder.Services.AddScoped<TableStorageContext>();
            builder.Services.AddScoped<TableStorageContext>(p => p.GetService<ServiceFactory>().CreateTableStorageContextNew());

        }

        private class ServiceFactory
        {
            private IConfiguration config;
            public ServiceFactory(IConfiguration config) => this.config = config;
            //public CloudStorageAccount CreateCloudStorageAccount() => CloudStorageAccount.Parse(this.config[Constants.StorageConnStringKey]);
            //public CloudTableClient CreateCloudTableClient() => this.CreateCloudStorageAccount().CreateCloudTableClient();
            //public TableClient CreateTableClient(string tableName) => new TableClient(this.config[Constants.StorageConnStringKey], tableName);
            public TableStorageContext CreateTableStorageContextNew() =>
                new TableStorageContext(
                    new TableClient(this.config[Constants.StorageConnStringKey], Tables.MenuItems),
                    new TableClient(this.config[Constants.StorageConnStringKey], Tables.Menus),
                    new TableClient(this.config[Constants.StorageConnStringKey], Tables.Order));
            
        }
    }
}
