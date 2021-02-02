using System.Collections.Generic;
using System.Net;
using System.Text;
using FreshFitFuel.Api.Models;
using Newtonsoft.Json;

namespace FreshFitFuel.Api.Services
{
    public static class EmailContentGenerator
    {
        public static string GenerateEmailBody(Order order)
        {
            var html = new StringBuilder();
            html.Append($"<p>Thank you for your order + supporting a small business! Your confirmation # is: <strong>{order.OrderNumber}</strong>.</p>");
            html.Append("<p>");
            if (order.DistributionMethod == "delivery")
            {
                html.Append("Your order will be delivered right to you between <strong>6pm-8pm on Sunday.</strong> ");
                html.Append("We ask that you either keep a lookout for your delivery OR leave a cooler outside for your food! ");
                html.Append("At Fresh Fit Fuel, we care about the environment and that is why all meal prep containers are 100% recyclable!");
            }
            else if (order.DistributionMethod == "pick-up at cove")
            {
                html.Append("Your order will be dropped off at the Cove fridge (by the front door) on Sunday night. ");
                html.Append("Please pick it up the next day (Monday) or any time you can! Your order will be in a stack with your name and order number on it. ");
                html.Append("Please bring your own bag because at Fresh Fit Fuel, we are eco-friendly and care about the environment. ");
                html.Append("Adding on to that, all meal prep containers are 100% recyclable! ");
            }
            else
            {
                html.Append($"Please pick up your order from <strong>9604 Larchmede Court, Ellicott City, MD 21042 between 4pm-6pm on Sunday</strong>. ");
                html.Append($"When you get here, text 443-286-7199 with either your name or order number. I will come out and give you your order (MASKS ON!!). ");
                html.Append($"Please bring your own bag because at Fresh Fit Fuel, we are eco-friendly and care about the environment. ");
                html.Append($"Adding on to that, all meal prep containers are 100% recyclable! ");
            }
            html.Append("</p>");

            html.Append("<table border=\"1\">");
            html.Append("<tr>");
            html.Append("<th>Item</th><th>Price</th><th>Quantity</th><th>Sub-total</th>");
            html.Append("</tr>");

            var lineItems = JsonConvert.DeserializeObject<List<LineItem>>(order.MenuItemsJson);
            foreach (var item in lineItems)
            {
                html.Append("<tr>");
                html.Append($"<td>{item.Name}</td>");
                html.Append($"<td>{item.Price:C}</td>");
                html.Append($"<td>{item.Quantity}</td>");
                html.Append($"<td>{item.SubTotal:C}</td>");
                html.Append("</tr>");
            }
            html.Append($"<tr><td colspan=\"3\"><strong>Grand Total:</strong></td><td><strong>{order.GrandTotal:C}</strong></td></tr>");
            html.Append("</table>");

            html.Append("<p>");
            html.Append("Any questions? Email me: freshfitfuelbyjenna@gmail.com OR DM me on Instagram: @fresh.fit.fuel.");
            html.Append("</p>");

            return html.ToString();
        }
    }
}
