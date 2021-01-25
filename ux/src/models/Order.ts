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
  lineItems: LineItem[],
  orderStatus: OrderStatus,
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
  price: number;
  subTotal: number;
}

export enum OrderStatus {
  OrderReceived,
  InvoiceSent,
  PaymentReceived,
  OrderReady,
  DistributionComplete
}
