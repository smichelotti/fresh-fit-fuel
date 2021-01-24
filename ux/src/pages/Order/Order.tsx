import React, { useState } from 'react';
import { BigTitle, MenuItemDisplay,  PersonalInformation } from '../../components'
import { MenuItem } from '../../models/MenuItem';
import { PersonalInfo } from '../../models/PersonalInfo';
import { useFetch } from '../../services/useFetch';
import { Accordion,  Button, Card, Spinner } from 'react-bootstrap';
import { CustomerOrder, LineItem } from '../../models/Order';
import { submitOrder } from '../../services/ClientApi';

export const Order: React.FunctionComponent = () => {
    const [currKey, setCurrKey] = useState('Menu');
    const { data, loading, error } = useFetch<MenuItem[]>('/api/menu-items');
    const [menuVar, setMenuVar] = useState(false);
    let disVar = false;
    

    const onMenuItemCompleted = (info: LineItem) => {
        lineItems = lineItems.map(item => item.menuItemId === info.menuItemId ? info : item);
    }
    const onPersonalInfoCompleted = async(info: PersonalInfo) => {
        console.log('Personal:', info);
        const ord: CustomerOrder = {
            lineItems: lineItems,
            grandTotal: 45.5,
            fullName: info.name,
            email: info.email,
            venmoHandle: info.venmo,
            distributionMethod: "delivery",
            streetAddress: info.streetAddress1,
            city: info.city,
            zipCode: info.zip
        }
        const response = await submitOrder(ord);
        console.log(response);
    }

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) throw error;
    let lineItems: LineItem[] = data.map((item): LineItem => ({ name: item.name, menuItemId: item.id || '', subTotal: 0, quantity: 0}));
    console.log('li', lineItems);

    return (
        <>
            <BigTitle name='Order Now' />
            <div className="container">

                <Accordion activeKey={currKey}>
                    <Card className="accordion-card">
                        {
                            (menuVar)
                                ? <Accordion.Toggle as={Card.Header} eventKey="Menu" onClick={() => setCurrKey("Menu")}>
                                    Menu
                                  </Accordion.Toggle>
                                : <Card.Header>Menu</Card.Header>
                        }
                        <Accordion.Collapse eventKey="Menu">
                            <Card.Body>
                                <div>
                                    {data.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <MenuItemDisplay item={item} onMenuCompleted={onMenuItemCompleted}/>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Button onClick={() => { setCurrKey("Personal"); setMenuVar(true); }} className="continue-btn">Continue</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className="accordion-card">
                        {
                            (disVar)
                                ? <Accordion.Toggle as={Card.Header} eventKey="Personal" onClick={() => setCurrKey("Personal")}>
                                    Personal Information
                                  </Accordion.Toggle>
                                : <Card.Header>Personal Information</Card.Header>
                        }
                        <Accordion.Collapse eventKey="Personal">
                            <Card.Body>
                                <PersonalInformation onPersonalInfoCompleted={onPersonalInfoCompleted} />
                            </Card.Body>
                        </Accordion.Collapse>
                        <div>
                        </div>
                    </Card>
                </Accordion>
            </div>
        </>
    );
}