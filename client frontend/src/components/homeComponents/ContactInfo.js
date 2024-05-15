import React from "react";
import { Link } from "react-router-dom";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-hands-helping"></i> {/* Updated icon for "Donate" */}
            </div>
            <Link to="/donate" className="donate-link">
              <h5>Donate</h5>
              <p>Do Good, Be Good</p>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-info-circle"></i> {/* Icon updated to represent "About Us" */}
            </div>
            <Link to="/about-us" className="about-us-link">
              <h5>About Us</h5>
              <p>Learn more Thriftn'</p>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-file-alt"></i> {/* Icon updated to represent "Policy" */}
            </div>
            <Link to="/policy" className="policy-link">
              <h5>Policy</h5>
              <p>Our Privacy Policy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
