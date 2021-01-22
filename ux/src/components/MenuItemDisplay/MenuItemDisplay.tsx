import React from 'react';
import { MenuItem } from '../../models/MenuItem';

interface MenuItemDisplayProps {
    item: MenuItem;
}



export const MenuItemDisplay: React.FunctionComponent<MenuItemDisplayProps> = (props) => {
    var n = props.item.price.toFixed(2);

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
                        <div className="col-md-3 mt-1" style={{ marginRight: '2%'}}>
                            <label style={{ color: 'white', float: 'left' }} htmlFor="quantity">Quantity:</label>
                            <input type="number" id="quantity" min="0" max="100" placeholder="0" />
                            <label style={{ color: 'white'}} htmlFor="subtotal">Subtotal:</label>
                            <p id="subtotal" style={{ color: 'white', float: 'right' }}>$test</p>


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