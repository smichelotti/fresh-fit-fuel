export interface Order {
  id?: string;              // not needed for Customer
  orderStatus: OrderStatus, // not needed for Customer
  orderSubmitted?: Date,    // not needed for Customer

  lineItems: LineItem[],
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
