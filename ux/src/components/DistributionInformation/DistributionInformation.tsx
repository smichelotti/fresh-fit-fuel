import { Field, Formik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { Alert, Col, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { PersonalInfo } from '../../models/PersonalInfo';

const emptyPersonalInfo: PersonalInfo = {
    name: '', email: '', venmo: '', distributionMethod: '', streetAddress1: '', streetAddress2: '', city: '', zip: 0
};

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    venmo: yup.string().required(),
    distributionMethod: yup.string().required(),
    streetAddress1: yup.string().required(),
    streetAddress2: yup.string(),
    city: yup.string().required(),
    zip: yup.string().required().matches(/^[0-9]+$/, "Must be only digits").min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits')
});

export const DistributionInformation: React.FunctionComponent = () => {
    const [isDelivery, setIsDelivery] = useState(false);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(emptyPersonalInfo);

    const onDeliveryMethodChange = (event: ChangeEvent<HTMLSelectElement>) => setIsDelivery(event.target.value === 'delivery');

    // const handleSubmit = async(item: MenuItem, formikProps: FormikHelpers<MenuItem>) => {
    //     try {
    //       setLoading(LoadingState.Loading);
    //       const response = await (isNew ? addMenuItem(item) : updateMenuItem(item));
    //       console.log('**successful response', response);
    //       setLoading(LoadingState.Loaded);
    //       history.push('/admin/menu-items');
    //     } catch (e) {
    //       console.error(e);
    //       setLoading(LoadingState.Error);
    //     }
    //   };


    return (
        <>
            <Formik
                initialValues={personalInfo}
                validationSchema={schema}
                onSubmit={() => console.log('clicked!!')}
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
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
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
                                    isInvalid={!!errors.email}
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
                                    isInvalid={!!errors.venmo}
                                    placeholder="Username"
                                />
                                <Form.Control.Feedback type="invalid">{errors.venmo}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="6" className="offset-md-3">
                                <label htmlFor="distributionMethod">
                                    How would you like to receive your food?
                                </label>
                                <select
                                    name="distributionType"
                                    value={values.distributionMethod}
                                    onChange={onDeliveryMethodChange}
                                    className="ml-4"
                                >
                                    <option value="pick-up" label="Pick-Up">Pick-Up</option>
                                    <option value="delivery" label="Delivery">Delivery</option>
                                </select>
                                <Alert className="mt-2" variant="info">
                                    Delivery will be an extra $5 charge. We delivery within 20 miles!
                                </Alert>
                            </Form.Group>
                        </Form.Row>

                        {isDelivery &&
                            <div>
                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Street Address 1</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="streetAddress1"
                                            value={values.streetAddress1}
                                            onChange={handleChange}
                                            isInvalid={!!errors.streetAddress1}
                                            placeholder="Street address, P.O. box, company name, c/o"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.streetAddress1}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Street Address 2</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="streetAddress2"
                                            value={values.streetAddress2}
                                            onChange={handleChange}
                                            isInvalid={!!errors.streetAddress2}
                                            placeholder="Apartment, suite, unit, building, floor, etc."
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.streetAddress2}</Form.Control.Feedback>
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
                                            isInvalid={!!errors.city}
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
                                            isInvalid={!!errors.zip}
                                            placeholder="#####"
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                            </div>
                        }

                    </Form>
                )}
            </Formik>


        </>
    );
}

export default DistributionInformation