import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { Order } from "../../../models/Order";

interface AddressProps { order: Order };

export const Address : React.FunctionComponent<AddressProps> = (props) => {
  if (props.order.distributionMethod !== 'delivery') {
    return null;
  }

  return (
    <Form.Row>
      <Form.Group as={Col} md="4">
        <Form.Label className="font-weight-bold">Street</Form.Label>
        <Form.Control plaintext readOnly defaultValue={props.order.streetAddress}/>
      </Form.Group>

      <Form.Group as={Col} md="4">
        <Form.Label className="font-weight-bold">City</Form.Label>
        <Form.Control plaintext readOnly defaultValue={props.order.city}/>
      </Form.Group>

      <Form.Group as={Col} md="4">
        <Form.Label className="font-weight-bold">Zip</Form.Label>
        <Form.Control plaintext readOnly defaultValue={props.order.zipCode}/>
      </Form.Group>
    </Form.Row>
  );
};