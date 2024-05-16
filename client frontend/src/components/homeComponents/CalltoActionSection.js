import React from "react";
import { Link } from "react-router-dom";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Thrift your way to a greener future.</h2>
              <div className="form-section">
                <input value="BUY" name="buy" type="submit" />
                <Link to="/addproduct">
                  <input value="SELL" name="sell" type="submit" />
                </Link>
                <Link to="/donate">
                  <input value="DONATE" name="donate" type="submit" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
