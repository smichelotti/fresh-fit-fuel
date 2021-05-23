import { CustomerMenu } from "../models/CustomerMenu";
import { Menu } from "../models/Menu";
import { MenuItem } from "../models/MenuItem";
import { Order, OrderConfirmation, OrderStatus } from "../models/Order";
import { StatsData } from "../models/StatsData";

/***** Customer endpoints *****/

export const getCurrentMenu = async (): Promise<CustomerMenu> => httpGet(`/api/customer/current-menu`);

export const submitOrder = async(order: Order): Promise<OrderConfirmation> => httpSend('/api/customer/order', 'POST', order);


/***** Admin endpoints *****/

// Menu Items
export const getMenuItems = async (): Promise<MenuItem[]> => httpGet(`/api/menu-items`);

export const getMenuItem = async (id: string): Promise<MenuItem> => httpGet(`/api/menu-items/${id}`);

export const addMenuItem = async (item: MenuItem): Promise<MenuItem> => await httpSend(`/api/menu-items`, 'POST', item);

export const updateMenuItem = async (item: MenuItem): Promise<MenuItem> => await httpSend(`/api/menu-items/${item.id}`, 'PUT', item);

// Menus
export const getMenus = async(): Promise<Menu[]> => httpGet(`/api/menus`);

export const getMenu = async(id: string): Promise<Menu> => httpGet(`/api/menus/${id}`);

export const addMenu = async(item: Menu): Promise<Menu> => await httpSend(`/api/menus`, 'POST', item);

export const updateMenu = async(item: Menu): Promise<Menu> => await httpSend(`/api/menus/${item.id}`, 'PUT', item);

// Order

export const getOrders = async(menuId: string): Promise<Order[]> => httpGet(`/api/orders?menuid=${menuId}`);
export const getOrdersStats = async(menuId: string): Promise<StatsData[]> => httpGet(`/api/orders-stats?menuid=${menuId}`);
export const getOrder = async(id: string): Promise<Order> => httpGet(`/api/orders/${id}`);
export const updateOrderStatus = async(id: string, orderStatus: OrderStatus): Promise<{orderStatus: OrderStatus}> => httpSend(`/api/orders/${id}/status`, 'PUT', { orderStatus: orderStatus });
export const deleteOrder = async(id: string): Promise<Response> => await fetch(`/api/orders/${id}`, { method: 'DELETE'});

// #region Private Methods

const httpGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const httpSend = async <TRequest, TResponse>(url: string, method: string, requestBody: TRequest): Promise<TResponse> => {
  const request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  };
  const response = await fetch(url, request);
  const json = await response.json();
  return json;
}

// #endregion