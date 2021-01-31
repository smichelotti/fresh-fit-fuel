import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import * as yup from 'yup';
import { PersonalInfo } from '../../models/PersonalInfo';

const emptyPersonalInfo: PersonalInfo = {
    name: '', email: '', venmo: '', distributionMethod: 'pick-up', streetAddress1: '', city: '', zip: ''
};
export interface PersonalInformationProps {
    onPersonalInfoCompleted(info: PersonalInfo): void;
    onBack(): void;
}

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    venmo: yup.string().required(),
    distributionMethod: yup.string(),
    streetAddress1: yup.string().when("name", {
        is: "Bob",
        then: yup.string().required()
      }),
    city: yup.string().when("name", {
        is: "Bob",
        then: yup.string().required()
      }),
    zip: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits').when("name", {
        is: "Bob",
        then: yup.string().required()
      }),
});

export const PersonalInformation: React.FunctionComponent<PersonalInformationProps> = (props) => {
    const handleSubmit = (item: PersonalInfo, formikProps: FormikHelpers<PersonalInfo>) => props.onPersonalInfoCompleted(item);

    return (
        <>
            <Formik
                initialValues={emptyPersonalInfo}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (

                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row className="mt-2">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name && touched.name}
                                    placeholder="Jane Doe"
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email && touched.email}
                                    placeholder="darth.vader@example.com"
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Venmo Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venmo"
                                    value={values.venmo}
                                    onChange={handleChange}
                                    isInvalid={!!errors.venmo && touched.venmo}
                                    placeholder="Username"
                                />
                                <Form.Control.Feedback type="invalid">{errors.venmo}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" className="offset-md-3">
                                <Form.Label>Distribution Method</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="distributionMethod"
                                    value={values.distributionMethod} 
                                    onChange={handleChange} 
                                >
                                    <option value="pick-up" label="Pick-Up">Pick-Up</option>
                                    <option value="delivery" label="Delivery">Delivery</option>
                                </Form.Control>
                                {values.distributionMethod === 'pick-up' &&
                                  <Alert className="mt-2 text-center" variant="info">
                                    Pick-up location is near Mount Hebron High School in Ellicott City, MD.<br/>
                                    Pick-up address sent in confirmation email.
                                  </Alert>}
                                  {values.distributionMethod === 'delivery' &&
                                    <Alert className="mt-2 text-center" variant="warning">
                                      Delivery will be an extra $5 charge. <br/>
                                      We delivery within 20 miles of Ellicott City, MD!
                                  </Alert>}
                            </Form.Group>
                        </Form.Row>

                        {(values.distributionMethod === "delivery") &&
                            <div>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Street Address 1</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="streetAddress1"
                                            value={values.streetAddress1}
                                            onChange={handleChange}
                                            isInvalid={!!errors.streetAddress1 && touched.streetAddress1}
                                            placeholder="Street address, P.O. box, company name, c/o"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.streetAddress1}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            isInvalid={!!errors.city && touched.city}
                                            placeholder="Smallville"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="zip"
                                            value={values.zip}
                                            onChange={handleChange}
                                            isInvalid={!!errors.zip && touched.zip}
                                            placeholder="#####"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                        }
                        <Button variant="secondary" onClick={props.onBack}>Back to Menu</Button>
                        <Button type="submit" className="continue-btn">Review Order</Button>
                    </Form>
                )}
            </Formik>


        </>
    );
}

export default PersonalInformation