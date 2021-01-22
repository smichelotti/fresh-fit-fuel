import React, { useState } from 'react';
import { BigTitle, MenuItemDisplay, AccordionToggle, DistributionInformation } from '../../components'
import { MenuItem } from '../../models/MenuItem';
import { useFetch } from '../../services/useFetch';
import { Accordion, Alert, Button, Card, Spinner } from 'react-bootstrap';


export const Order: React.FunctionComponent = () => {
    const [currKey, setCurrKey] = useState('Menu');
    const { data, loading, error } = useFetch<MenuItem[]>('/api/menu-items');
    const [menuVar, setMenuVar] = useState(false);
    const [disVar, setDisVar] = useState(false);
    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) throw error;

    console.log('asoethu', JSON.stringify(data));

    return (
        <>
            <BigTitle name='Order Now' />
            <div className="container">

                <Accordion activeKey={currKey}>
                    <Card>
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
                                                <MenuItemDisplay item={item} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <Button onClick={() => { setCurrKey("Distribution"); setMenuVar(true); }} className="continue-btn">Continue</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        {
                            (disVar)
                                ? <Accordion.Toggle as={Card.Header} eventKey="Distribution" onClick={() => setCurrKey("Distribution")}>
                                    Distribution Information
                                  </Accordion.Toggle>
                                : <Card.Header>Distribution Information</Card.Header>
                        }
                        <Accordion.Collapse eventKey="Distribution">
                            <Card.Body>
                                <DistributionInformation />
                                <Button onClick={() => { setCurrKey("Venmo"); setDisVar(true); }} className="continue-btn">Continue</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                        <div>
                        </div>
                    </Card>
                    <Card>
                        <Card.Header>Venmo</Card.Header>
                        <Accordion.Collapse eventKey="Venmo">
                            <Card.Body>
                                <div className="form-group">
                                    <label className="control-label">Venmo Username</label>
                                    <input type="text" id="venmo-username" className="form-control" placeholder="Username" />
                                </div>
                                <Alert className="mt-2" variant="info">
                                    You will recieve a Venmo request after checkout. You must complete the request BEFORE your order is filled!
                                </Alert>
                                <Button onClick={() => setCurrKey('Venmo')} className="continue-btn">Checkout</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </>
    );
}