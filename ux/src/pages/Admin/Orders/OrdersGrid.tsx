import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { ConfirmationDialog } from '../../../components/ConfirmationDialog/ConfirmationDialog';
import { InlineSpinner } from '../../../components/InlineSpinner/InlineSpinner';
import { LoadingState } from '../../../models/LoadingState';
import { Order } from '../../../models/Order';
import { StatsData } from '../../../models/StatsData';
import { deleteOrder, getOrders, getOrdersStats } from '../../../services/ClientApi';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrdersGridProps {
  selectedMenuId: string;
}

export const OrdersGrid: React.FunctionComponent<OrdersGridProps> = (props) => {
  const [loading, setLoading] = useState(LoadingState.Loading);
  const [orders, setOrders] = useState([] as Order[]);
  const [ordersStats, setOrdersStats] = useState([] as StatsData[]);
  const [args, setArgs] = useState({show: false} as {show: boolean, title?: string, idToDelete?: string});

  const [updating, setUpdating] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  
  useEffect(() => {
    const getAll = async() => {
      try {
        setLoading(LoadingState.Loading);
        const [items, stats] = await Promise.all([getOrders(props.selectedMenuId), getOrdersStats(props.selectedMenuId)])
        setOrders(items);
        setOrdersStats(stats);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(LoadingState.Loaded);
      }
    };
    getAll();
  }, [props.selectedMenuId]);

  useEffect(() => {
    setGrandTotal(orders.reduce((total, currValue) => total + currValue.grandTotal, 0));
  }, [orders]);

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

  if (loading === LoadingState.Loading) return <AppSpinner text="Loading Orders..." />
  // if (error) throw error;
  
  return (
    <>
      <ConfirmationDialog show={args.show} title={args.title} message="Are you absolutely positively sure? This cannot be undone!" yesText="Yes (Delete)" onDismiss={onDismiss} />

      {updating && <InlineSpinner text="Updating..." />}
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Distribution</th>
              <th>Grand Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(x => (
              <tr key={x.id}>
                <td>
                  {x.fullName} <br/>
                  <OrderStatusBadge status={x.orderStatus} />
                </td>
                <td>{x.distributionMethod}</td>
                <td>${x.grandTotal.toFixed(2)}</td>
                <td>
                  <LinkContainer to={`/admin/orders/${x.id}`} exact={true}>
                    <Button className="btn-sm mr-2" variant="primary">
                      <i className="fa fa-cutlery"></i>
                    </Button>
                  </LinkContainer>

                  <a href={`https://waze.com/ul?q=${encodeURIComponent(x.streetAddress || '')}`} target="_blank" rel="noreferrer" 
                    {...(!x.streetAddress ? { className: 'disabled-link'} : {})}>
                    <Button size="sm" variant="info" className="mr-2" disabled={!x.streetAddress}>
                      <i className="fa fa-map" aria-hidden="true"></i>
                    </Button>
                  </a>

                  <a href={`sms:+1${x.phone}?&body=Your%20Fresh%20Fit%20Fuel%20order%20has%20been%20delivered!%20%3A)`} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="info" className="mr-2">
                      <i className="fa fa-comment" aria-hidden="true"></i>
                    </Button>
                  </a>

                  <Button className="btn-sm" variant="danger" onClick={() => cancelOrder(x)}>
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="table-success font-weight-bold">
              <td colSpan={2}><span className="float-right">Running Total:</span></td>
              <td>${grandTotal.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <hr />

        <h4>Order Stats</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Menu Item</th>
              <th></th>
              <th>Customer</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {ordersStats.map(x => (
              <React.Fragment key={x.menuItemId}>
                <tr className="table-primary">
                  <td className="font-weight-bold" colSpan={3}>{x.name}</td>
                  <td className="font-weight-bold">{x.count}</td>
                </tr>
                {x.options.map(o => (
                  <React.Fragment key={o.name}>
                  <tr key={o.name} className="table-warning">
                    <td></td>
                    <td>{o.name}</td>
                    <td></td>
                    <td>{o.count}</td>
                  </tr>
                  {o.customers.map(c => (
                     <tr key={c.fullName}>
                      <td colSpan={2}></td>
                      <td>{c.fullName}</td>
                      <td>{c.quantity}</td>
                     </tr>
                  ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
            <tr className="table-success font-weight-bold">
              <td colSpan={3}><span className="float-right">Total Count:</span></td>
              <td>{ordersStats.reduce((total, currValue) => total + currValue.count, 0)}</td>
            </tr>
          </tbody>
        </Table>

    </>
  );
};
