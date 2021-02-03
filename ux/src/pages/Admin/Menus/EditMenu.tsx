import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BigTitle } from '../../../components';
import { LoadingState } from '../../../models/LoadingState';
import { Menu } from '../../../models/Menu';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import { addMenu, getMenu, getMenuItems, updateMenu } from '../../../services/ClientApi';
import { AppSpinner } from '../../../components/AppSpinner/AppSpinner';
import { MenuItem } from '../../../models/MenuItem';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import 'react-datepicker/dist/react-datepicker.css';

interface IdParams { id: string }

const emptyMenu: Menu = {
  name: '', startTime: new Date(), endTime: new Date(), menuItemIds: []
};

interface OrderableItem extends MenuItem { order: number; }

export const EditMenu: React.FunctionComponent = () => {
  const { id } = useParams<IdParams>();
  const [isNew] = useState(id === 'new');
  const [menu, setMenu] = useState<Menu>(emptyMenu);
  const [loading, setLoading] = useState(LoadingState.Loading);
  const [saving, setSaving] = useState(LoadingState.Loaded);
  
  const [menuName, setMenuName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [srcItems, setSrcItems] = useState([] as MenuItem[]);
  const [destItems, setDestItems] = useState([] as OrderableItem[]);
  const history = useHistory();

  useEffect(() => {
    const getItems = async() => {
      try {
        setLoading(LoadingState.Loading);
        if (isNew) {
          const all = await getMenuItems()
          setSrcItems(all);
        } else {
          const [ m, items] = await Promise.all([getMenu(id), getMenuItems()]);
          setMenu(m);
          setMenuName(m.name);
          setStartDate(new Date(m.startTime));
          setEndDate(new Date(m.endTime));
          setDestItems(m.menuItemIds.map((id, i) => ({...items.find(s => s.id === id), order: i} as OrderableItem)));
          setSrcItems(items.filter(x => !m.menuItemIds.includes(x.id || '')));
        }
        setLoading(LoadingState.Loaded);
      } catch (e) {
        console.error(e);
        setLoading(LoadingState.Error);
      }
    };
    getItems();
  }, [id, isNew]);

  const add = (item: MenuItem) => {
    setSrcItems(srcItems.filter(i => i.id !== item.id));
    setDestItems(destItems.concat({...item, order: destItems.length}));
  };

  const remove = (item: MenuItem) => {
    setSrcItems(srcItems.concat(item));
    setDestItems(destItems.filter(i => i.id !== item.id));
  };

  const up = (item: OrderableItem) => {
    const currIndex = destItems.indexOf(item);
    if (currIndex === 0) return;
    swapArrayElements(currIndex, currIndex - 1);
  };

  const down = (item: OrderableItem) => {
    const currIndex = destItems.indexOf(item);
    if (currIndex === destItems.length-1) return;
    swapArrayElements(currIndex, currIndex + 1);
  };

  const swapArrayElements = (index1: number, index2: number) => {
    const temp = destItems[index1];
    destItems[index1] = destItems[index2];
    destItems[index2] = temp;
    const newDestItems = destItems.map((item, index) => ({...item, order: index}));
    setDestItems(newDestItems);
  };

  const save = async() => {
    const item : Menu = {
      name: menuName,
      startTime: startDate,
      endTime: endDate,
      menuItemIds: destItems.map(x => x.id || '')
    };
    console.log('**about to sAVE', item);
    try {
      setSaving(LoadingState.Loading);
      const response = await (isNew ? addMenu(item) : updateMenu({...item, id: menu.id}));
      console.log('**successful response', response);
      setSaving(LoadingState.Loaded);
      history.push('/admin/menus');
    } catch (e) {
      console.error(e);
      setSaving(LoadingState.Error);
    }
  };

  if (loading === LoadingState.Loading) return <AppSpinner text="Loading menu..." />
  // if (error) throw error;

  return (
    <>
      <BigTitle name='Manage Menus' />
      <div className="container">

        <Form>
          <Form.Row>
            <Button onClick={() => save()}>Save</Button>
            <LinkContainer to={`/admin/menus`} exact={true}>
              <Button className="ml-2" variant="secondary">Cancel</Button>
            </LinkContainer>
            {saving === LoadingState.Loading && <AppSpinner text="Saving..." />}
          </Form.Row>

          <Form.Row className="mt-2">
            <Form.Group as={Col} md="4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={menuName}
                onChange={ev => setMenuName(ev.target.value)}
              />
              {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Start Date</Form.Label>
              <DatePicker selected={startDate} name="startDate" showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" onChange={(date:Date) => setStartDate(date)} className="form-control" />
            </Form.Group>
          
            <Form.Group as={Col} md="4">
              <Form.Label>End Time</Form.Label>
              <DatePicker selected={endDate} name="endDate" showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" onChange={(date:Date) => setEndDate(date)} className="form-control" />
            </Form.Group>
          </Form.Row>

          <Form.Row>

            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {srcItems.map(i => (
                    <tr key={i.id}>
                      <td>{i.name}</td>
                      <td>{i.category}</td>
                      <td>
                        <Button size="sm" variant="primary" onClick={() => add(i)}>
                            Add <i className="fa fa-arrow-right pl-2" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </Table>
            </Col>

            <Col>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {destItems.map((i) => (
                    <tr key={i.id}>
                      <td>
                        <Button size="sm" variant="danger" onClick={() => remove(i)}>
                          <i className="fa fa-arrow-left pr-2" aria-hidden="true"></i> Remove
                        </Button>
                      </td>
                      <td>{i.name}</td>
                      <td>{i.category}</td>
                      <td>
                        {/* {(i.order !== 0) && <Button size="sm" variant="info" className="mr-1" onClick={() => up(i)}>
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        </Button>}
                        {(i.order !== destItems.length-1) && <Button size="sm" variant="info" onClick={() => down(i)}>
                          <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        </Button>} */}

                        <Button size="sm" variant="info" className="mr-1" onClick={() => up(i)}>
                          <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        </Button>
                        <Button size="sm" variant="info" onClick={() => down(i)}>
                          <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </Table>
            </Col>


          </Form.Row>
        </Form>
      </div>
    </>
  );
};
