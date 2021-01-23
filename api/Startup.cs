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
            builder.Services.AddAutoMapper(typeof(Startup));
            builder.Services.AddScoped<TableStorageContext>(p => p.GetService<ServiceFactory>().CreateTableStorageContextNew());
        }

        private class ServiceFactory
        {
            private IConfiguration config;
            public ServiceFactory(IConfiguration config) => this.config = config;
            public TableStorageContext CreateTableStorageContextNew() =>
                new TableStorageContext(
                    new TableClient(this.config[Constants.StorageConnStringKey], Tables.MenuItems),
                    new TableClient(this.config[Constants.StorageConnStringKey], Tables.Menus),
                    new TableClient(this.config[Constants.StorageConnStringKey], Tables.Order));
        }
    }
}
