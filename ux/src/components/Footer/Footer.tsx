import React from 'react';

export const Footer: React.FunctionComponent = () => {
    return (
        <>
            <div className="footer-top-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row" style={{ display: 'flex' }}>
                        <div className="col-md-3 col-sm-6" style={{ margin: 'auto' }}>
                            <div className="footer-about-us">
                                <h2><span>Fresh Fit Fuel</span></h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sunt id doloribus vero
                                quam laborum quas alias dolores blanditiis iusto consequatur, modi aliquid eveniet eligendi
                                iure eaque ipsam iste, pariatur omnis sint! Suscipit, debitis, quisquam. Laborum commodi
                                veritatis magni at?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom-area">
                <div className="container"> 
                    <div className="row" style={{ display: 'flex' }}>
                        <div className="col-md-8" style={{ margin: 'auto' }}>
                            <div className="copyright">
                                <p>&copy; 2021 Fresh Fit Fuel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer