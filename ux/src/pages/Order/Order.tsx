import React, { useEffect, useState } from 'react';
import { BigTitle, MenuItemDisplay,  PersonalInformation } from '../../components'
import { MenuItem } from '../../models/MenuItem';
import { PersonalInfo } from '../../models/PersonalInfo';
import { useFetch } from '../../services/useFetch';
import { Button, Card, Spinner } from 'react-bootstrap';
import { LineItem, Order, OrderStatus } from '../../models/Order';
import { submitOrder } from '../../services/ClientApi';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';

enum Step { 
  Menu,
  PersonalInfo,
  Review,
  Confirmation
};

export const OrderScreen: React.FunctionComponent = () => {
    const { data, loading, error } = useFetch<MenuItem[]>('/api/customer/current-menu');
    const [currStep, setCurrStep] = useState(Step.Menu);
    const [order, setOrder] = useState({} as Order);
    const [lineItems, setLineItems] = useState([] as LineItem[]);

    useEffect(() => {
      if (data.length) {
        setLineItems(data.map((item): LineItem => ({ name: item.name, menuItemId: item.id || '', price: item.price, subTotal: 0, quantity: 0 })));
      }
    }, [data]);

    const onMenuItemCompleted = (info: LineItem) => setLineItems(lineItems.map(item => item.menuItemId === info.menuItemId ? info : item));
    
    const onPersonalInfoCompleted = (info: PersonalInfo) => {
      let total = (info.distributionMethod === 'delivery' ? 5 : 0);
      lineItems.map(x => total += x.subTotal);

      const ord: Order = {
          lineItems: lineItems,
          orderStatus: OrderStatus.OrderReceived,
          grandTotal: total,
          fullName: info.name,
          email: info.email,
          venmoHandle: info.venmo,
          distributionMethod: info.distributionMethod,
          streetAddress: info.streetAddress1,
          city: info.city,
          zipCode: info.zip
      }
      setOrder(ord);
      setCurrStep(Step.Review);
    }

    const placeOrder = async() => {
      const response = await submitOrder(order);
      setOrder({...order, orderNumber: response.orderNumber});
      setCurrStep(Step.Confirmation);
    }

    const onBack = () => setCurrStep(currStep - 1);

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) throw error;

    return (
      <>
        <BigTitle name='Order Now' />
        <div className="container">

          {currStep === Step.Menu &&
            <div className="row">
              <div className="col mx-auto">
                <Card className="mb-2">
                  <Card.Header as="h5" className="green-bg text-white">Menu</Card.Header>
                  <Card.Body>
                    {data.map((item, i) => (
                      <div key={i}>
                        <MenuItemDisplay item={item} onMenuCompleted={onMenuItemCompleted}/>
                      </div>
                    ))}

                    <Button onClick={() => setCurrStep(Step.PersonalInfo)} className="continue-btn">Continue</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          }

          {currStep === Step.PersonalInfo && 
            <div className="row">
              <div className="col mx-auto">
                <Card className="mb-2">
                  <Card.Header as="h5" className="green-bg text-white">Personal Information</Card.Header>
                  <Card.Body>
                    <PersonalInformation onPersonalInfoCompleted={onPersonalInfoCompleted} onBack={onBack} />
                  </Card.Body>
                </Card>
              </div>
            </div>
          }

          {currStep === Step.Review && 
            <div className="row">
              <div className="col mx-auto">
                <Card className="mb-2">
                  <Card.Header as="h5" className="green-bg text-white">Review Order</Card.Header>
                  <Card.Body>
                    <OrderSummary order={order} />

                    <Button variant="secondary" onClick={onBack}>Back to Personal Information</Button>
                    <Button className="continue-btn" onClick={placeOrder}>Place Order</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          }

          {currStep === Step.Confirmation && 
            <div className="row">
              <div className="col mx-auto">
                <Card className="mb-2">
                  <Card.Header as="h5" className="green-bg text-white">Confirmation</Card.Header>
                  <Card.Body className="confirmation">
                    <p>
                      Thank you for your order!! 
                      Your Order Confirmation # is: {order.orderNumber}.
                    </p>
                    <p>
                      Meal prep is LIFEEEEE... 
                      I’m so happy you are experiencing it. 
                      <b> All pick ups or deliveries will be completed this coming Sunday. </b>
                      Be on the lookout for an email with full instructions and a Venmo request. 
                      Hope to see you back here soon!!!
                    </p>

                    <p>&mdash; Jenna + Fresh Fit Fuel</p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          }



        </div>
      </>
    );
}