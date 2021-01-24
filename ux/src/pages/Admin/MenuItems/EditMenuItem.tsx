import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import { BigTitle } from '../../../components';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import { getMenuItem, addMenuItem, updateMenuItem } from '../../../services/ClientApi';
import Button from 'react-bootstrap/esm/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { MenuItem } from '../../../models/MenuItem';
import { LoadingState } from '../../../models/LoadingState';


interface MIParams { id: string }

const emptyMenuItem: MenuItem = {
  name: '', description: '', price: 0, carbs: 0, fat: 0, protein: 0, imageUrl: '', calories: 0, category: ''
};

const schema = yup.object({
  name: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  price: yup.number().required(),
  carbs: yup.number(),
  fat: yup.number(),
  protein: yup.number(),
  calories: yup.number()
});

export const EditMenuItem: React.FunctionComponent = () => {
  const { id } = useParams<MIParams>();
  const [isNew] = useState(id === 'new');
  const [menuItem, setMenuItem] = useState<MenuItem>(emptyMenuItem);
  const [loading, setLoading] = useState(LoadingState.NotLoaded);
  const history = useHistory();

  useEffect(() => {
    if (isNew) return;

    const getItems = async() => {
      try {
        setLoading(LoadingState.Loading);
        const item = await getMenuItem(id);
        setMenuItem(item);
        setLoading(LoadingState.Loaded);
      } catch (e) {
        console.error(e);
        setLoading(LoadingState.Error);
      }
    };
    getItems();
  }, [id, isNew]);
 
  const handleSubmit = async(item: MenuItem, formikProps: FormikHelpers<MenuItem>) => {
    try {
      setLoading(LoadingState.Loading);
      const response = await (isNew ? addMenuItem(item) : updateMenuItem(item));
      console.log('**successful response', response);
      setLoading(LoadingState.Loaded);
      history.push('/admin/menu-items');
    } catch (e) {
      console.error(e);
      setLoading(LoadingState.Error);
    }
  };

  return (
    <>
      <BigTitle name='Manage Menu Items' />
      <div className="container">

        <Formik
          initialValues={menuItem}
          enableReinitialize={true}
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
              <Form.Row>
                <LinkContainer to={`/admin/menu-items`} exact={true}>
                  <Button className="ml-2" variant="secondary">Cancel</Button>
                </LinkContainer>
                {loading === LoadingState.Loading && <Spinner animation="border" variant="primary" />}
              </Form.Row>

              <Form.Row className="mt-2">
                <Form.Group as={Col} md="4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    isInvalid={!!errors.category}
                  />
                  <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>

              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="3">
                  <Form.Label>Carbs</Form.Label>
                  <Form.Control
                    type="text"
                    name="carbs"
                    value={values.carbs}
                    onChange={handleChange}
                    isInvalid={!!errors.carbs}
                  />
                  <Form.Control.Feedback type="invalid">{errors.carbs}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Protein</Form.Label>
                  <Form.Control
                    type="text"
                    name="protein"
                    value={values.protein}
                    onChange={handleChange}
                    isInvalid={!!errors.protein}
                  />
                  <Form.Control.Feedback type="invalid">{errors.protein}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Fat</Form.Label>
                  <Form.Control
                    type="text"
                    name="fat"
                    value={values.fat}
                    onChange={handleChange}
                    isInvalid={!!errors.fat}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fat}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    type="text"
                    name="calories"
                    value={values.calories}
                    onChange={handleChange}
                    isInvalid={!!errors.calories}
                  />
                  <Form.Control.Feedback type="invalid">{errors.calories}</Form.Control.Feedback>
                </Form.Group>

              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    value={values.imageUrl}
                    onChange={handleChange}
                    isInvalid={!!errors.imageUrl}
                  />
                  <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {menuItem.imageUrl && <img src={menuItem.imageUrl} alt="" />}
              </Form.Row>

            </Form>
        )}
        </Formik>
        
      </div>
    </>
  );
}