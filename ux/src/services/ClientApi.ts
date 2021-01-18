
export interface MenuItemInfo { 
  id: number, 
  name: string,
  price: number,
  description: string, 
  category: string,
  carbs: number,
  fat: number,
  protein: number,
  calories: number,
  imageUrl: string
};


export const getMenuItems = async (): Promise<MenuItemInfo[]> => httpGet(`/api/menu-items`);

export const getMenuItem = async (id: string): Promise<MenuItemInfo> => httpGet(`/api/menu-items/${id}`);

export const addMenuItem = async (item: MenuItemInfo): Promise<MenuItemInfo> => await httpSend(`/api/menu-items`, 'POST', item);

export const updateMenuItem = async (item: MenuItemInfo): Promise<MenuItemInfo> => await httpSend(`/api/menu-items/${item.id}`, 'PUT', item);

// #region Private Methods

const httpGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

// const httpSend = async (url: string, method: string, requestBody: any): Promise<Response> => {
//   const request = {
//     method: method,
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(requestBody)
//   };
//   return fetch(url, request);
// }

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