using System.Data;
using System.Data.SqlClient;
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
            builder.Services.AddScoped<IDbConnection>(x => {
                var config = x.GetService<IConfiguration>();
                return new SqlConnection(config["fff-conn-string"]);
            });
        }
    }
}
