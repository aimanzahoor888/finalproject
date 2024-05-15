import React from "react";

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
                <input value="SELL" name="sell" type="submit" />
                <input value="DONATE" name="donate" type="submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
