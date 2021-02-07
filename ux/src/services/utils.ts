import { OrderStatus } from '../models/Order';

export const orderStatusText = (status: OrderStatus):string => {
  switch (status) {
    case OrderStatus.OrderReceived: return 'Order Received';
    case OrderStatus.InvoiceSent: return 'Invoice Sent';
    case OrderStatus.PaymentReceived: return 'Payment Received';
    case OrderStatus.OrderReady: return 'Order Ready';
    case OrderStatus.DistributionComplete: return 'Distribution Complete';
    default: return `Invalid Order status: ${status}`;
  }
}

export const ToDateTime = (dt: Date | undefined): string => new Date(dt?.toString() || '').toLocaleString();
