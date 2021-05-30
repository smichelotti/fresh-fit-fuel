import Badge from 'react-bootstrap/esm/Badge';
import { OrderStatus } from '../../../models/Order';
import { orderStatusText } from '../../../services/utils';

interface OrderStatusBadgetProps { status: OrderStatus };

const getBadgeColor = (status: OrderStatus) => {
  if (status === OrderStatus.PaymentReceived) {
    return 'primary';
  } else if (status === OrderStatus.DistributionComplete) {
    return 'success';
  } else {
    return 'secondary';
  }
}

export const OrderStatusBadge: React.FunctionComponent<OrderStatusBadgetProps> = (props) => {
  const badgeColor = getBadgeColor(props.status);

  return (
    <Badge variant={badgeColor}>{orderStatusText(props.status)}</Badge>
  );
};