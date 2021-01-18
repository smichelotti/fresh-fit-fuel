import React from 'react';
import { MenuItem } from '../../models/MenuItem';

interface MenuItemDisplayProps {
    item: MenuItem;
}

export const MenuItemDisplay: React.FunctionComponent<MenuItemDisplayProps> = (props) => {
    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="menu-item">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={props.item.imageUrl} alt="logo" className="m-3" />
                        </div>
                        <div className="col-md-6">
                            <div>
                                <p className="menu-item-name text-start">{props.item.name} - {props.item.price}</p>

                                <p className="menu-item-desc">Chicken as a meat has been depicted in Babylonian carvings from around 600 BC.[2] Chicken was one of the most common meats available in the Middle Ages.[citation needed] It was eaten over most of the Eastern hemisphere and a number of different kinds of chicken such as capons, pullets and hens were eaten. It was one of the basic ingredients in the so-called white dish, a stew usually consisting of chicken and fried onions cooked in milk and seasoned with spices and sugar.</p>
                            </div>
                        </div>
                        <div className="col-md-3 mt-3">
                            <p style={{ color: 'white' }}>Quantity:</p>
                            <input type="number" id="quantity" min="0" max="100" placeholder="0"/>

                            <div className="macro-info">
                                <p>Carbs: {props.item.carbs}</p>
                                <p>Protein: {props.item.protein}</p>
                                <p>Fat: {props.item.fat}</p>
                                <p>Calories: {props.item.calories}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuItemDisplay;