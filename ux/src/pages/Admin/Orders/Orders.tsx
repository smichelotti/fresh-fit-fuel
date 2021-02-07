import React, { useEffect, useState } from 'react';
import { BigTitle } from '../../../components';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { LoadingState } from '../../../models/LoadingState';
import { getMenus } from '../../../services/ClientApi';
import Form from 'react-bootstrap/esm/Form';
import { SelectItem } from '../../../models/SelectItem';
import { ToDateTime } from '../../../services/utils';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { OrdersGrid } from './OrdersGrid';

export const Orders: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(LoadingState.Loading);
  const [menus, setMenus] = useState([] as SelectItem[]);
  const [selectedMenuId, setSelectedMenuId] = useState('');

  useEffect(() => {
    const getMenusList = async() => {
      try {
        setLoading(LoadingState.Loading);
        const items = await getMenus();
        const menuList = items.map(x => ({ value: x.id || '', text: `${ToDateTime(x.startTime)} - ${ToDateTime(x.endTime)}` }))
        setMenus(menuList);
        setSelectedMenuId(menuList[0].value)
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(LoadingState.Loaded);
      }
    };
    getMenusList();
  }, []);

  if (loading === LoadingState.Loading) return <AppSpinner text="Loading..." />
  // if (error) throw error;
  
  return (
    <>
      <BigTitle name='Manage Orders' />

      <div className="container">

        <Form.Group as={Row}>
          <Form.Label column sm={1}>Menus:</Form.Label>
          <Col sm={5}>
            <Form.Control as="select" id="menu" size="sm" onChange={(ev) => setSelectedMenuId(ev.target.value)}>
              {menus.map(x => <option key={x.value} value={x.value}>{x.text}</option> )}
            </Form.Control>
          </Col>
        </Form.Group>

        <OrdersGrid selectedMenuId={selectedMenuId} />

      </div>
    </>
  );
}