export interface CustomerOrder {
  lineItems: LineItem[]
  grandTotal: number;
  fullName: string;
  email: string;
  venmoHandle: string;
  distributionMethod: string;
  streetAddress?: string;
  city?: string;
  zipCode?: string;
}

export interface Order {
  id: string;
  lineItems: LineItem[]
  grandTotal: number;
  fullName: string;
  email: string;
  venmoHandle: string;
  distributionMethod: string;
  streetAddress?: string;
  city?: string;
  zipCode?: string;
}

export interface LineItem {
  menuItemId: string;
  name: string;
  quantity: number;
  subTotal: number;
}