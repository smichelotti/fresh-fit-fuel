import React from "react";

export const Footer: React.FunctionComponent = () => {
  return (
    <>
      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-md-2 offset-md-4">
              <div className="copyright">
                  <p>&copy; 2021 Fresh Fit Fuel</p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer-social">
                <a href="mailto:freshfitfuelbyjenna@gmail.com">
                  <i className="fa fa-envelope-o"></i>
                </a>
                <a href="https://www.instagram.com/fresh.fit.fuel/" target="_blank" rel="noreferrer">
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
