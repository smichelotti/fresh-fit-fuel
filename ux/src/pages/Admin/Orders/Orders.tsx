import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { BigTitle } from '../../../components';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { Order } from '../../../models/Order';
import { useFetch } from '../../../services/useFetch';
import { OrderStatusBadge } from './OrderStatusBadge';

export const Orders: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch<Order[]>('/api/orders');
  if (loading) return <AppSpinner text="Loadding..." />
  if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Orders' />

      <div className="container">
        
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
            {data.map(x => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}