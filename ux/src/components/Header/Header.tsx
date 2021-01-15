import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export const Header: React.FunctionComponent = () => {
    return (
        <>
            <div className="site-branding-area">
                <div className="logo">
                    <h1><a><img src=".\jenna-logo.jpg" /><span className="text-nowrap">Fresh Fit Meals</span></a></h1>
                </div>
            </div>

            <div className="mainmenu-area">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="navbar-collapse collapse" style={{ display: 'flex' }}>
                            <ul className="nav navbar-nav" style={{ margin: 'auto' }}>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About Me</Link>
                                </li>
                                <li>
                                    <Link to="/process">How It Works</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header