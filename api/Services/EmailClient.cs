using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FreshFitFuel.Api.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Services
{
    public interface IEmailClient
    {
        Task SendConfirmation(Order order);
    }

    public class EmailClient : IEmailClient
    {
        private HttpClient http;
        private IConfiguration config;
        private bool sendEmail;

        public EmailClient(HttpClient http, IConfiguration config)
        {
            this.http = http;
            this.config = config;
            this.http.BaseAddress = new Uri(config["logic-app-email-url"]);
            bool.TryParse(config["send-email"], out var send);
            this.sendEmail = send;
        }

        public async Task SendConfirmation(Order order)
        {
            if (!this.sendEmail)
            {
                return;
            }
            var request = new
            {
                email = order.Email,
                message = EmailContentGenerator.GenerateEmailBody(order)
            };
            await this.http.PostAsync(string.Empty, ToStringContent(request));
        }

        private static StringContent ToStringContent<T>(T item)
        {
            return new StringContent(JsonConvert.SerializeObject(item), Encoding.UTF8, "application/json");
        }
    }
}
