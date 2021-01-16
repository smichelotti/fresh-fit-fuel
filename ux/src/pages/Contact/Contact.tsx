import React from 'react';
import BigTitle from '../../components/BigTitle/BigTitle';

export const Contact: React.FunctionComponent = () => {
  return (
    <>
      

      <BigTitle name='Contact' />

      <div id="contact-content" className="container" style={{ paddingTop: '25px' }}>
        <div className="row">
          <div className="col-sm-3 col-sm-offset-3" style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <h2>Social Media</h2>
              <ul className="list-unstyled">
                <li className="contact-link">
                  <a href="https://www.instagram.com/jennamichelotti_cf/">
                    <i className="fa fa-instagram"></i> Instagram
                            </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3" style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <h2>Contact Info</h2>
              <ul className="list-unstyled who">
                <li className="contact-link"><a href="mailto:michelotti12@gmail.com"><i className="fa fa-envelope"></i> Email(ToDo)</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <p className="customer-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
          quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
          iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
          veritatis magni at? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
          quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
          iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
          veritatis magni at? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
          quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
          iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                veritatis magni at?</p>
        </div>
      </div>
    </>
  );
}