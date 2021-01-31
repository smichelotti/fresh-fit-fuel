import React, { ChangeEvent, useState } from 'react';
import { MenuItem } from '../../models/MenuItem';
import { LineItem } from '../../models/Order';
import Image from 'react-bootstrap/esm/Image';
import Form from 'react-bootstrap/esm/Form';
interface MenuItemDisplayProps {
    item: MenuItem,
    onMenuCompleted(lineItem: LineItem): void;
}

export const MenuItemDisplay: React.FunctionComponent<MenuItemDisplayProps> = (props) => {
    const [subtotal, setSubtotal] = useState("0.00");

    const onQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const st = (props.item.price * parseInt(event.target.value)).toFixed(2);
        setSubtotal(st);
        const lineItem: LineItem = {
            menuItemId: props.item.id || '',
            name: props.item.name,
            quantity: parseInt(event.target.value),
            price: props.item.price,
            subTotal: parseFloat(st)
        };
        props.onMenuCompleted(lineItem);
    }

    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="menu-item">
                    <div className="row">
                        <div className="col-sm-3">
                            <Image src={props.item.imageUrl} className="menu-item-image" rounded />
                        </div>
                        <div className="col-sm-6">
                            <div>
                                <p className="menu-item-name text-start">{props.item.name} - ${props.item.price.toFixed(2)}</p>

                                <p className="menu-item-desc">{props.item.description}</p>
                            </div>
                        </div>
                        <div className="col-sm-2 menu-item-quantity-col">
                            <label htmlFor="quantity">Quantity:</label>
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
                            <p id="subtotal" style={{ color: 'white', float: 'right' }}>${subtotal}</p>


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