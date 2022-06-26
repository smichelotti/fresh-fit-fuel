import React, { useEffect, useState } from 'react';
import { BigTitle, MenuItemDisplay,  PersonalInformation } from '../../components'
import { PersonalInfo } from '../../models/PersonalInfo';
import { LineItem, Order, OrderStatus } from '../../models/Order';
import { getCurrentMenu, submitOrder } from '../../services/ClientApi';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import Spinner from 'react-bootstrap/esm/Spinner';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import { CustomerMenu } from '../../models/CustomerMenu';
import Alert from 'react-bootstrap/esm/Alert';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from 'react-bootstrap/esm/Form';
import { LoadingState } from '../../models/LoadingState';

enum Step { 
  Menu,
  PersonalInfo,
  Review,
  Confirmation
};

export const OrderScreen: React.FunctionComponent = () => {
    const [custMenu, setCustMenu] = useState({} as CustomerMenu);
    const [stats, setStats] = useState({} as Record<string, number>);
    const [loading, setLoading] = useState(LoadingState.Loading);
    const [currStep, setCurrStep] = useState(Step.Menu);
    const [order, setOrder] = useState({} as Order);
    const [lineItems, setLineItems] = useState([] as LineItem[]);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [ordersLocked, setOrdersLocked] = useState(false);
    const [specialInstructions, setSpecialInstructions] = useState('');

    useEffect(() => {
      const getCustMenu = async() => {
        try {
          setLoading(LoadingState.Loading);
          const menu = await getCurrentMenu();
          setCustMenu(menu.currentMenu);
          
          if (menu?.currentMenu?.menuItems?.length) {
            setOrdersLocked(new Date(menu.currentMenu.end) < new Date());
            setLineItems(menu.currentMenu.menuItems.map((item): LineItem => ({ name: item.name, menuItemId: item.id || '', price: item.price, subTotal: 0, quantity: 0 })));
            const statsMap : Record<string, number> = menu.currentMenu.menuItems.reduce((a, x) => ({...a, [x.id || '']: menu.stats.find((s) => s.menuItemId === x.id)?.count || 0}), {});
            setStats(statsMap);
          }
          setLoading(LoadingState.Loaded);
        } catch (e) {
          console.error(e);
          setLoading(LoadingState.Error);
        }
      };
      getCustMenu();
    }, []);

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
          zipCode: info.zip,
          phone: info.phone,
          specialInstructions: specialInstructions
      }
      setOrder(ord);
      setCurrStep(Step.Review);
    }

    const placeOrder = async() => {
      setSubmitDisabled(true);
      const response = await submitOrder(order);
      setOrder({...order, orderNumber: response.orderNumber});
      setCurrStep(Step.Confirmation);
    }

    const onBack = () => setCurrStep(currStep - 1);

    if (loading === LoadingState.Loading) return <Spinner animation="border" variant="primary" />;
    if (loading === LoadingState.Error) throw Error;

    return (
      <>
        <BigTitle name='Order Now' />
        <div className="container">
          {ordersLocked && <Alert className="mt-2 text-center" variant="danger">
            <Alert.Heading>Orders are closed for the week. Stay tuned for the next menu!</Alert.Heading>
          </Alert>}

          {currStep === Step.Menu &&
            <div className="row">
              <div className="col mx-auto">
                <Card className="mb-2">
                  <Card.Header as="h5" className="green-bg text-white">Menu</Card.Header>
                  <Card.Body>
                    {custMenu.menuItems.map((item, i) => (
                      <div key={i}>
                        <MenuItemDisplay item={item} onMenuCompleted={onMenuItemCompleted} ordersLocked={ordersLocked} runningCount={stats[item.id || '']}/>
                      </div>
                    ))}

                    <FormGroup>
                      <Form.Label>Optional special instructions <small className="text-muted">(we'll try to accomodate within reason)</small>:</Form.Label>
                      <Form.Control as="textarea" rows={2} placeholder="e.g., hold the onions" 
                        value={specialInstructions} 
                        onChange={(ev) => setSpecialInstructions(ev.target.value)}/>
                    </FormGroup>

                    {!ordersLocked && <Button onClick={() => setCurrStep(Step.PersonalInfo)} className="continue-btn">Continue</Button>}
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
                    <Button className="continue-btn" onClick={placeOrder} disabled={submitDisabled}>Place Order</Button>
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