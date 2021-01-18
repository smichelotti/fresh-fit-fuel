import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

export const AdminHeader: React.FunctionComponent = () => {
  const links = [
    { title: 'Admin Home', url: '/admin' },
    { title: 'Orders', url: '/admin/orders' },
    { title: 'Menus', url: '/admin/menus' },
    { title: 'Menu Items', url: '/admin/menu-items' }
  ];

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
                    <Nav className="mr-auto">
                    {links.map(l => (
                      <LinkContainer key={l.url} to={l.url} exact={true}>
                        <Nav.Link>{l.title}</Nav.Link>
                      </LinkContainer>
                    ))}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
      </>
  );
}
