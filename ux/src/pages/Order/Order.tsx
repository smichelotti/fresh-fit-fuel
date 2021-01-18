import React from 'react';
import { BigTitle, MenuItemDisplay, AccordionToggle, DistributionInformation } from '../../components'
import { MenuItem } from '../../models/MenuItem';
import { useFetch } from '../../services/useFetch';
import { Accordion, Alert, Card } from 'react-bootstrap';

export const Order: React.FunctionComponent = () => {
    const { data, loading, error } = useFetch<MenuItem>('/api/menu-items');
    if (error) throw error;

    console.log(JSON.stringify(data));

    return (
        <>
            <BigTitle name='Order Now' />
            <div className="container">

                {!loading && <h4>This is the order now page</h4>}
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>Menu</Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div>
                                    {data.map((item, i) => {
                                        return (
                                            <MenuItemDisplay item={item} />
                                        );
                                    })}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        <AccordionToggle eventKey="1" navType="accordion-proceed pull-right" text="Continue to Distribution Information" />
                    </Card>
                    <Card>
                        <Card.Header>Distribution Information</Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <DistributionInformation />
                            </Card.Body>
                        </Accordion.Collapse>
                        <div>
                            <AccordionToggle eventKey="0" navType="accordion-previous pull-left" text="Go Back to Menu" />
                            <AccordionToggle eventKey="2" navType="accordion-proceed pull-right" text="Continue to Venmo Information" />
                        </div>
                    </Card>
                    <Card>
                        <Card.Header>Venmo Information</Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <div className="form-group">
                                    <label className="control-label">Venmo Username</label>
                                    <input type="text" id="venmo-username" className="form-control" placeholder="Username" />
                                </div>
                                <Alert className="mt-2" variant="info">
                                    You will recieve a Venmo request after checkout. You must complete the request BEFORE your order is filled!
                                </Alert>
                            </Card.Body>
                        </Accordion.Collapse>
                        <div>
                            <AccordionToggle eventKey="1" navType="accordion-previous pull-left" text="Go Back to Distribution Information" />
                            <button className="accordion-proceed pull-right">Checkout</button>
                        </div>
                    </Card>
                </Accordion>
            </div>
        </>
    );
}