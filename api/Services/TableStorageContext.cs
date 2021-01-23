using Azure.Data.Tables;

namespace FreshFitFuel.Api.Services
{
    public class TableStorageContext
    {
        public TableStorageContext(TableClient menuItems, TableClient menus, TableClient orders)
        {
            this.MenuItems = menuItems;
            this.Menus = menus;
            this.Orders = orders;
        }
        public TableClient MenuItems { get; }
        public TableClient Menus { get; }
        public TableClient Orders { get; }
    }
}
