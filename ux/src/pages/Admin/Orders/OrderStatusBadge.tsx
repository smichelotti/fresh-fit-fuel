import Badge from 'react-bootstrap/esm/Badge';
import { OrderStatus } from '../../../models/Order';
import { orderStatusText } from '../../../services/utils';

interface OrderStatusBadgetProps { status: OrderStatus };

export const OrderStatusBadge: React.FunctionComponent<OrderStatusBadgetProps> = (props) => {
  const badgeColor = props.status === OrderStatus.DistributionComplete ? 'success' : 'secondary';
  return (
    <Badge variant={badgeColor}>{orderStatusText(props.status)}</Badge>
  );
};