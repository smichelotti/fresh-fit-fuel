import React from 'react';
import BigTitle from '../../components/BigTitle/BigTitle';

export const Contact: React.FunctionComponent = () => {
  return (
    <>
      

      <BigTitle name='Contact' />

      <div id="contact-content" className="container" style={{ paddingTop: '25px' }}>
        <div className="row">
          <div className="col-md-6" style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <h2>Social Media</h2>
              <ul className="list-unstyled">
                <li className="contact-link">
                  <a href="https://www.instagram.com/fresh.fit.fuel/">
                    <i className="fa fa-instagram"></i> fresh.fit.fuel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6" style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <h2>Contact Info</h2>
              <ul className="list-unstyled who">
                <li className="contact-link">
                  <a href="mailto:freshfitfuelbyjenna@gmail.com">
                    <i className="fa fa-envelope"></i> freshfitfuelbyjenna@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}