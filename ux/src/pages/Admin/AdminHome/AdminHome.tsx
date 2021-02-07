import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import CardGroup from 'react-bootstrap/esm/CardGroup';
import { Link } from 'react-router-dom';
import { BigTitle } from '../../../components';

export const AdminHome: React.FunctionComponent = () => {
  
  return (
    <>
      <BigTitle name='Admin Home' />

      <div className="container">
        <CardGroup>
          <Card>
            <Card.Header as="h5">Orders</Card.Header>
            <Card.Body>View and manage orders.</Card.Body>
            <Card.Footer>
              <Link to="/admin/orders">
                <Button variant="primary">Orders</Button>
              </Link>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header as="h5">Menus</Card.Header>
            <Card.Body>Manage menus.</Card.Body>
            <Card.Footer>
              <Link to={`/admin/menus`}>
                <Button variant="success">Menus</Button>
              </Link>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header as="h5">Menu Items</Card.Header>
            <Card.Body>View and manage menu items.</Card.Body>
            <Card.Footer>
              <Link to={`/admin/menu-items`}>
                <Button variant="warning">Menu Items</Button>
              </Link>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    </>
  );
}