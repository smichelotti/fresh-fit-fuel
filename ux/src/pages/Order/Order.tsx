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
                                                <MenuItemDisplay item={item} />
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
                                <DistributionInformation />
                                <Button onClick={() => { setCurrKey("Venmo"); setDisVar(true); }} className="continue-btn">Continue</Button>
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