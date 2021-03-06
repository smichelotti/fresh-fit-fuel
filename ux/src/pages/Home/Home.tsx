import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/esm/Image';

export const Home: React.FunctionComponent = () => {
  return (
    <>

      <img src=".\meal-prep.png" alt=""/>

      <div className="d-flex justify-content-center">
        <Link to="/order" className="btn btn-lg order-btn">View Menu</Link>
      </div>

      <div className="promo-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-lemon-o"></i>
                <p>Clean ingredients</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-cutlery"></i>
                <p>Sanitized area</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-truck"></i>
                <p>Delivery or pick-up</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-calculator"></i>
                <p>Macros provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="maincontent-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-1">
              <Image src="https://freshfitfuel.blob.core.windows.net/images/jenna-cooking-480-640.jpg" style={{ margin: 'auto' }} rounded/>

            </div>
            <div className="col-md-6 mt-1">
              <Image src="https://freshfitfuel.blob.core.windows.net/images/stove-480-640.jpg" style={{ margin: 'auto' }} rounded/>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}