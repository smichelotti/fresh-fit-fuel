import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

export const Header: React.FunctionComponent = () => {
    const links = [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about' },
      { title: 'How It Works', url: '/process' },
      { title: 'Contact', url: '/contact' }
    ];

    return (
        <>
          <div className="site-branding-area">
            <div className="logo">
              <img src="/logo-411x224.png" alt="logo" />
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

export default Header