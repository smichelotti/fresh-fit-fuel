import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BigTitle from '../../components/BigTitle/BigTitle';
import { Link } from 'react-router-dom';

export const Home: React.FunctionComponent = () => {
  return (
    <>

      <img src=".\meal-prep.png" />

      <div className="align-center">
        <Link to="/order" className="btn btn-lg" style={{ backgroundColor: '#1ABC9C', color: 'black' }}>Order Now</Link>
      </div>

      <div className="promo-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-refresh"></i>
                <p>Something here</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-truck"></i>
                <p>Free shipping</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-lock"></i>
                <p>Secure payments</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="single-promo">
                <i className="fa fa-gift"></i>
                <p>Whatever you want</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="maincontent-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="latest-product">
                <h2 className="section-title">Next Week/This Week?</h2>
                <div style={{ display: 'flix' }}>
                  <p style={{ margin: 'auto' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                  quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                  iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                                veritatis magni at?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}