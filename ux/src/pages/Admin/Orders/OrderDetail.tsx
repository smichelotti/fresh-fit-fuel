import * as React from 'react';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import { Alert, Button, ProgressBar, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LoadingState } from '../../../models/LoadingState';
import { Order } from '../../../models/Order';
import { getOrder } from '../../../services/ClientApi';
import { useFetch } from '../../../services/useFetch';
import { LineItems } from './LineItems';
import { setIn } from 'formik';


interface MIParams { id: string }

export const OrderDetail: React.FunctionComponent = () => {
  const { id } = useParams<MIParams>();
  const [loading, setLoading] = useState(LoadingState.NotLoaded);
  // const [order, setOrder] = useState<Order>({} as Order);
  const { data: order, loading: loadingInit, error } = useFetch<Order>(`/api/orders/${id}`);

  // temp for testing
  const [invoiceSent, setInvoiceSent] = useState('secondary');
  const [statusBtnTest, setStatusBtnText] = useState('Next: Invoice Sent');

  if (loadingInit) return <Spinner animation="border" variant="primary" />
  if (error) throw error;
  
  // useEffect(() => {
  //   const getItem = async() => {
  //     try {
  //       setLoading(LoadingState.Loading);
  //       var order = await getOrder(id);
  //       console.log('**order', order);
  //       setOrder(order);
  //       setLoading(LoadingState.Loaded);
  //     } catch (e) {
  //       console.error(e);
  //       setLoading(LoadingState.Error);
  //     }
  //   };
  //   getItem();
  // }, [id]);

  const Address : React.FunctionComponent = () => {
    if (order.distributionMethod === 'pick-up' || loading !== LoadingState.Loaded) {
      return null;
    }

    return (
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Street</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.streetAddress}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">City</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.city}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Zip</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.zipCode}/>
        </Form.Group>
      </Form.Row>
    );
  };
  
  // TODO: Status Workflow: 1) New -> 2) Invoice sent -> 3) Payment received -> 4) Meals Ready/Prepared -> 5) Distributed/Complete
  // TODO: Workflow toggle buttons
  // const now = 25;

  const nextStatus = () => {
    console.log('**inside next status');
    setInvoiceSent('success');
    setStatusBtnText('Next: Payment Received')
  };

  return (
    <div className="container">
      {(loading === LoadingState.Loading) && <Spinner animation="border" variant="primary" />}


      <Alert variant="primary">
        <span className="text-left">Order Number: 123</span>
        <span className="float-right">Status: Order Received</span>
      </Alert>

      {/* <ProgressBar now={now} label={`${now}%`} className="mb-2 order-progress" /> */}

      <ProgressBar className="mb-2 order-progress">
        <ProgressBar label="Order Received" now={20} max={20} variant="success"/>
        <ProgressBar label="Invoice Sent" now={20} max={20} variant={invoiceSent}/>
        <ProgressBar label="Payment Received" now={20} max={20} variant="secondary"/>
        <ProgressBar label="Meals Ready" now={20} max={20} variant="secondary"/>
        <ProgressBar label="Distribution Complete" now={20} max={20} variant="secondary"/>
      </ProgressBar>

      <Row>
        <Col>
          <Button variant="primary" size="sm" className="mb-2" onClick={nextStatus}>Back: Order Received</Button>  
        </Col>
        <Col>
          <Button variant="primary" size="sm" className="mb-2 float-right" onClick={nextStatus}>{statusBtnTest}</Button>  
        </Col>
      </Row>
      

      <LineItems lineItems={order.lineItems} distribution={order.distributionMethod} grandTotal={order.grandTotal} />

      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Name</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.fullName}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Email</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.email}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Venmo</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.venmoHandle}/>
        </Form.Group>
      </Form.Row>
      
      <Address />
      <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Street</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.streetAddress}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">City</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.city}/>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label className="font-weight-bold">Zip</Form.Label>
          <Form.Control plaintext readOnly defaultValue={order.zipCode}/>
        </Form.Group>
      </Form.Row>

    
    </div>
  );
};

