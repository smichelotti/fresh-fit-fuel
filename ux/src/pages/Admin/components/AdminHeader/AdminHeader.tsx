import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';

export const AdminHeader: React.FunctionComponent = () => {
    return (
        <>
          <div className="site-branding-area">
              <div className="logo">
                  <h1><img src="/jenna-logo.jpg" alt="logo" /><span className="text-nowrap">Fresh Fit Meals Admin</span></h1>
              </div>
          </div>
          <div className="mainmenu-area">
              <div className="container">

                  <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav activeKey={window.location.pathname} className="mr-auto">
                        <Nav.Link href="/admin/orders">Orders</Nav.Link>
                        <Nav.Link href="/admin/menus">Menus</Nav.Link>
                        <Nav.Link href="/admin/menu-items">Menu Items</Nav.Link>
                      </Nav>
                    </Navbar.Collapse>
                  </Navbar>

              </div>
          </div>
        </>
    );
}
