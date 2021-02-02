import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { BigTitle } from '../../../components';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { ConfirmationDialog } from '../../../components/ConfirmationDialog/ConfirmationDialog';
import { InlineSpinner } from '../../../components/InlineSpinner/InlineSpinner';
import { LoadingState } from '../../../models/LoadingState';
import { Order } from '../../../models/Order';
import { getOrders, deleteOrder } from '../../../services/ClientApi';
import { OrderStatusBadge } from './OrderStatusBadge';

export const Orders: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(LoadingState.Loading);
  const [orders, setOrders] = useState([] as Order[]);
  const [args, setArgs] = useState({show: false} as {show: boolean, title?: string, idToDelete?: string});
  const [updating, setUpdating] = useState(false);


  useEffect(() => {
    const getAll = async() => {
      try {
        setLoading(LoadingState.Loading);
        var items = await getOrders();
        setOrders(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(LoadingState.Loaded);
      }
    };
    getAll();
  }, []);

  const cancelOrder = async (order: Order) => setArgs({ show: true, title: `Delete order ${order.orderNumber}?`, idToDelete: order.id });

  const onDismiss = async(confirmed: boolean) => {
    if (confirmed) {
      try {
        setUpdating(true);
        await deleteOrder(args.idToDelete || '');
        setOrders(orders.filter(x => x.id !== args.idToDelete));
      } catch (e) {
        console.error(e);
      } finally {
        setUpdating(false);
      }
    }
    setArgs({ show: false });
  };

  if (loading === LoadingState.Loading) return <AppSpinner text="Loading..." />
  // if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Orders' />
      <ConfirmationDialog show={args.show} title={args.title} message="Are you absolutely positively sure? This cannot be undone!" yesText="Yes (Delete)" onDismiss={onDismiss} />

      <div className="container">
        {updating && <InlineSpinner text="Updating..." />}
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Order #</th>
              <th>Order Status</th>
              <th>Grand Total</th>
              <th>Time received</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(x => (
              <tr key={x.id}>
                <td>{x.fullName}</td>
                <td>{x.orderNumber}</td>
                <td>
                  <OrderStatusBadge status={x.orderStatus} />
                </td>
                <td>${x.grandTotal.toFixed(2)}</td>
                <td>{(new Date(x.orderSubmitted?.toString() || ''))?.toLocaleString()}</td>
                <td>
                  <LinkContainer to={`/admin/orders/${x.id}`} exact={true}>
                    <Button className="btn-sm mr-2" variant="primary">View</Button>
                  </LinkContainer>
                  <Button className="btn-sm" variant="danger" onClick={() => cancelOrder(x)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}