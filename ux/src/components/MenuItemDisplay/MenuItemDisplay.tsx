import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { MenuItem } from '../../models/MenuItem';

interface MenuItemDisplayProps {
    item: MenuItem;
}



export const MenuItemDisplay: React.FunctionComponent<MenuItemDisplayProps> = (props) => {
    var n = props.item.price.toFixed(2);
    const [currQuan, setCurrQuan] = useState(0);

    const onQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => setCurrQuan(parseInt(event.target.value));

    var n2 = (parseInt(n) * currQuan).toFixed(2);

    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="menu-item">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={props.item.imageUrl} alt="logo" className="menu-item-image"/>
                        </div>
                        <div className="col-md-5">
                            <div>
                                <p className="menu-item-name text-start">{props.item.name} - ${n}</p>

                                <p className="menu-item-desc">{props.item.description}</p>
                            </div>
                        </div>
                        <div className="col-md-3" style={{ margin: '1%' }}>
                            <label style={{ color: 'white', float: 'left' }} htmlFor="quantity">Quantity:</label>
                            <Form.Control as="select" id="quantity" size="sm" onChange={onQuantityChange}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                            <label style={{ color: 'white' }} htmlFor="subtotal">Subtotal:</label>
                            <p id="subtotal" style={{ color: 'white', float: 'right' }}>${n2}</p>


                            <table className="table table-sm macro-info table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Carbs</td>
                                        <td>{props.item.carbs}</td>
                                    </tr>
                                    <tr>
                                        <td>Protein</td>
                                        <td>{props.item.protein}</td>
                                    </tr>
                                    <tr>
                                        <td>Fat</td>
                                        <td>{props.item.fat}</td>
                                    </tr>
                                    <tr>
                                        <td>Calories</td>
                                        <td>{props.item.calories}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuItemDisplay;