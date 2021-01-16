import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FunctionComponent = () => {
    return (
        <>


            <nav className="">
                <div className="site-branding-area">
                    <div className="logo">
                        <h1><img src=".\jenna-logo.jpg" alt="logo" /><span className="text-nowrap">Fresh Fit Meals</span></h1>
                    </div>
                </div>
                <div className="mainmenu-area">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#Navbar">
                                <span className="sr-only">Navigation ein- / ausblenden</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a className="navbar-brand" href="#"><img src="images/logo.jpg" alt="" /></a>
                        </div>

                        <div id="Navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
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
            </nav>
        </>
    );
}

export default Header