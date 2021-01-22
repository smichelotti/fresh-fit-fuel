namespace FreshFitFuel.Api.Models
{
    public class MenuItem : IItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Carbs { get; set; }
        public int Protein { get; set; }
        public int Fat { get; set; }
        public int Calories { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
    }
}
