import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { BigTitle } from '../../../components';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { Menu } from '../../../models/Menu';
import { useFetch } from '../../../services/useFetch';

export const Menus: React.FunctionComponent = () => {
  const { data, loading, error } = useFetch<Menu[]>('/api/menus');
  if (loading) return <AppSpinner text="Loading menus..." />
  if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Menus' />

      <div className="container">
        <LinkContainer to={`/admin/menus/new`} exact={true}>
          <Button className="btn-sm mb-2" variant="primary">New Menu</Button>
        </LinkContainer>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(x => (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{new Date(x.startTime).toLocaleString()}</td>
                <td>{new Date(x.endTime).toLocaleString()}</td>
                <td>
                  <LinkContainer to={`/admin/menus/${x.id}`} exact={true}>
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