import { MenuItem } from "../models/MenuItem";


export const getMenuItems = async (): Promise<MenuItem[]> => httpGet(`/api/menu-items`);

export const getMenuItem = async (id: string): Promise<MenuItem> => httpGet(`/api/menu-items/${id}`);

export const addMenuItem = async (item: MenuItem): Promise<MenuItem> => await httpSend(`/api/menu-items`, 'POST', item);

export const updateMenuItem = async (item: MenuItem): Promise<MenuItem> => await httpSend(`/api/menu-items/${item.id}`, 'PUT', item);


// #region Private Methods

const httpGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const httpSend = async <T>(url: string, method: string, requestBody: T): Promise<T> => {
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