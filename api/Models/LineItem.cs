namespace FreshFitFuel.Api.Models
{
    public class LineItem
    {
        public string MenuItemId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double SubTotal { get; set; }
    }
}
