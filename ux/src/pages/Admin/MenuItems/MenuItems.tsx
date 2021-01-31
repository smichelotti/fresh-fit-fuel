import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { BigTitle } from '../../../components';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { MenuItem } from '../../../models/MenuItem';
import { useFetch } from '../../../services/useFetch';

export const MenuItems: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch<MenuItem[]>('/api/menu-items');
  if (loading) return <AppSpinner text="Loading menu items..." />
  if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Menu Items' />

      <div className="container">
        <LinkContainer to={`/admin/menu-items/new`} exact={true}>
          <Button className="btn-sm mb-2" variant="primary">New Menu Item</Button>
        </LinkContainer>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(x => (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.category}</td>
                <td>
                  <LinkContainer to={`/admin/menu-items/${x.id}`} exact={true}>
                    <Button className="btn-sm mr-2" variant="primary">Edit</Button>
                  </LinkContainer>
                  <Button className="btn-sm" variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}