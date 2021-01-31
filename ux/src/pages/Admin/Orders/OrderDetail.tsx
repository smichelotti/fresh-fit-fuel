import * as React from 'react';
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import { useParams } from 'react-router-dom';
import { Order, OrderStatus } from '../../../models/Order';
import { getOrder, updateOrderStatus } from '../../../services/ClientApi';
import { OrderStatusBadge } from './OrderStatusBadge';
import { orderStatusText } from '../../../services/utils';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { LoadingState } from '../../../models/LoadingState';
import { InlineSpinner } from '../../../components/InlineSpinner/InlineSpinner';
import { OrderSummary } from '../../../components/OrderSummary/OrderSummary';
import Alert from 'react-bootstrap/esm/Alert';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';

interface MIParams { id: string }

export const OrderDetail: React.FunctionComponent = () => {
  const { id } = useParams<MIParams>();
  const [loading, setLoading] = useState(LoadingState.Loading);
  const [order, setOrder] = useState<Order>({} as Order);
  const [btnTexts, setBtnTexts] = useState({ back: '', next: '' });
  const [updating, setUpdating] = useState(false);
  
  useEffect(() => {
    const getItem = async() => {
      try {
        setLoading(LoadingState.Loading);
        var order = await getOrder(id);
        setOrder(order);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(LoadingState.Loaded);
      }
    };
    getItem();
  }, [id]);

  useEffect(() => {
    const backText = order.orderStatus === OrderStatus.OrderReceived ? '' : orderStatusText(order.orderStatus - 1);
    const nextText = order.orderStatus === OrderStatus.DistributionComplete ? '' : orderStatusText(order.orderStatus + 1);
    setBtnTexts({ back: backText, next: nextText });
  }, [order])

  const setOrderStatus = async(orderStatus: OrderStatus) => {
    try {
      setUpdating(true);
      await updateOrderStatus(order.id || '', orderStatus);
      setOrder({...order, orderStatus: orderStatus });
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  }

  const getProgressSegmentColor = (status: OrderStatus) => (status <= order.orderStatus) ? 'success' : 'secondary';

  if (loading === LoadingState.Loading) return <AppSpinner text="Loading..." />
  // TODO: if error show error component here

  return (
    <div className="container">
      <Alert variant="primary" className="text-center">
        <span className="float-left">Order Number: {order.orderNumber}</span>
        <span>Received: {(new Date(order.orderSubmitted?.toString() || ''))?.toLocaleString()}</span>
        <div className="float-right"><OrderStatusBadge status={order.orderStatus} /></div>
      </Alert>

      <ProgressBar className="mb-2 order-progress">
        <ProgressBar label="Order Received" now={20} max={20} variant={getProgressSegmentColor(OrderStatus.OrderReceived)} />
        <ProgressBar label="Invoice Sent" now={20} max={20} variant={getProgressSegmentColor(OrderStatus.InvoiceSent)} />
        <ProgressBar label="Payment Received" now={20} max={20} variant={getProgressSegmentColor(OrderStatus.PaymentReceived)} />
        <ProgressBar label="Order Ready" now={20} max={20} variant={getProgressSegmentColor(OrderStatus.OrderReady)} />
        <ProgressBar label="Distribution Complete" now={20} max={20} variant={getProgressSegmentColor(OrderStatus.DistributionComplete)} />
      </ProgressBar>

      <Row>
        <Col>
          {btnTexts.back && <Button variant="primary" size="sm" className="mb-2" onClick={() => setOrderStatus(order.orderStatus - 1)}>Back: {btnTexts.back}</Button> }
        </Col>
        <Col>
          {updating && <InlineSpinner text="Updating..." />}
        </Col>
        <Col>
          {btnTexts.next && <Button variant="primary" size="sm" className="mb-2 float-right" onClick={() => setOrderStatus(order.orderStatus + 1)}>Next: {btnTexts.next}</Button> }
        </Col>
      </Row>

      <OrderSummary order={order} />
    
    </div>
  );
};

