import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import { Order } from '../../models/Order';
import { Address } from './Address';
import { LineItems } from './LineItems';

interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary: React.FunctionComponent<OrderSummaryProps> = (props) => {
  
  return (
    <>
      <LineItems lineItems={props.order.lineItems} distribution={props.order.distributionMethod} grandTotal={props.order.grandTotal} />

      {props.order.specialInstructions &&
        <Form.Row>
          <Form.Group as={Col} md="11">
            <Form.Label className="font-weight-bold">Special Instructions</Form.Label>
            <Form.Control plaintext readOnly defaultValue={props.order.specialInstructions}/>
          </Form.Group>
        </Form.Row>
      }

      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Name</Form.Label>
          <Form.Control plaintext readOnly defaultValue={props.order.fullName}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Email</Form.Label>
          <Form.Control plaintext readOnly defaultValue={props.order.email}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Venmo</Form.Label>
          <Form.Control plaintext readOnly defaultValue={props.order.venmoHandle}/>
        </Form.Group>
      </Form.Row>

      <Address order={props.order} />
    </>
  );
};
