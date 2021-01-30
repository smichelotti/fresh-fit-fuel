import { MenuItem } from "../models/MenuItem";
import { Order, OrderConfirmation, OrderStatus } from "../models/Order";

/***** Customer endpoints *****/

export const getCurrentMenu = async (): Promise<MenuItem[]> => httpGet(`/api/customer/current-menu`);

export const submitOrder = async(order: Order): Promise<OrderConfirmation> => httpSend('/api/customer/order', 'POST', order);


/***** Admin endpoints *****/

// Menu Items
export const getMenuItems = async (): Promise<MenuItem[]> => httpGet(`/api/menu-items`);

export const getMenuItem = async (id: string): Promise<MenuItem> => httpGet(`/api/menu-items/${id}`);

export const addMenuItem = async (item: MenuItem): Promise<MenuItem> => await httpSend(`/api/menu-items`, 'POST', item);

export const updateMenuItem = async (item: MenuItem): Promise<MenuItem> => await httpSend(`/api/menu-items/${item.id}`, 'PUT', item);

// Order

export const getOrder = async(id: string): Promise<Order> => httpGet(`/api/orders/${id}`);
export const updateOrderStatus = async(id: string, orderStatus: OrderStatus): Promise<{orderStatus: OrderStatus}> => httpSend(`/api/orders/${id}/status`, 'PUT', { orderStatus: orderStatus });


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