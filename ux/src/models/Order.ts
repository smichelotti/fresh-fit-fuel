export interface Order {
  // Not needed for Customer
  id?: string;
  orderStatus: OrderStatus,
  orderSubmitted?: Date,
  orderNumber?: string,

  // Needed for Customer
  lineItems: LineItem[],
  grandTotal: number;
  fullName: string;
  email: string;
  venmoHandle: string;
  distributionMethod: string;
  streetAddress?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  specialInstructions?: string;
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
  DistributionComplete
}

export interface OrderConfirmation {
  orderNumber: string;
}

export interface Delivery {
  name: string;
  address: string;
  phone: string;
}