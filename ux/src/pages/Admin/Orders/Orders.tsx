import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/esm/Table';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { BigTitle } from '../../../components';
import { Order } from '../../../models/Order';
import { useFetch } from '../../../services/useFetch';

export const Orders: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch<Order[]>('/api/orders');
  if (loading) return <Spinner animation="border" variant="primary" />
  if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Orders' />

      <div className="container">
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <td>Grand Total</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(x => (
              <tr key={x.id}>
                <td>{x.fullName}</td>
                <td>{x.email}</td>
                <td>${x.grandTotal.toFixed(2)}</td>
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