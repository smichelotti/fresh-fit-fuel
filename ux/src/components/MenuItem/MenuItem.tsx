import React from 'react';

export const MenuItem: React.FunctionComponent = () => {
    var value = 1;

    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="menu-item">
                    <div className="row">
                        <div className="col-md-3">
                            <img src=".\chicken.jpg" alt="logo" style={{ padding: '15px' }} />
                        </div>
                        <div className="col-md-6">
                            <div>
                                <p className="menu-item-name text-start">Honey Mustard Chicken Meal Prep - $9.99</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <p className="menu-item-desc text-start">
                                    Description description Description description
                                    Description description Description description Description description Description description
                                    Description description Description description Description description Description description
                                    Description description Description description Description description Description description
                                    Description description Description description Description description Description description
                                    Description description Description description Description description Description description
                                    Description description Description description Description description Description description
                            </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <p style={{ color: 'white' }}>Quantity:</p>
                            <input type="number" id="quantity" min="0" max="100" />
                            <button className="add-to-cart">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuItem;