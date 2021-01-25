import React from 'react';
import Table from 'react-bootstrap/esm/Table';
import { LineItem } from '../../../models/Order';


interface LineItemsProps {
  lineItems: LineItem[];
  distribution: string;
  grandTotal: number;
};

export const LineItems: React.FunctionComponent<LineItemsProps> = (props) => {

  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th><span className="float-right">Sub-total</span></th>
        </tr>
      </thead>
      <tbody>
        {props.lineItems.map(x => (
          <tr key={x.menuItemId}>
            <td>{x.name}</td>
            <td>${x.price.toFixed(2)}</td>
            <td>{x.quantity}</td>
            <th><span className="float-right">${x.subTotal.toFixed(2)}</span></th>
          </tr>
        ))}
        <tr>
          <td colSpan={3}><span className="float-right">Distribution (Delivery):</span></td>
          <th><span className="float-right">$5.00</span></th>
        </tr>
        <tr className="table-primary">
          <th colSpan={3}><span className="float-right">Grand Total:</span></th>
          <th><span className="float-right">${props.grandTotal.toFixed(2)}</span></th>
        </tr>
      </tbody>
    </Table>
  );
};