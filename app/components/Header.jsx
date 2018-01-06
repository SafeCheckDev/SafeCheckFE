import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../images/safecheck-logo-black.png';

const Header = ({ onChange }) => (
  <nav
    className="navbar navbar-light bg-light mb-4"
    style={{
      boxShadow: '0 0 2rem rgba(0,0,0,.2)',
    }}
  >
    <div className="container">
      <a href="/" className="navbar-brand mb-0">
        <img src={Logo} height="30" alt="" />
      </a>

      <form className="form-inline my-2 my-lg-0">
        <select className="form-control" onChange={onChange}>
          <option>Form</option>
          <option value="TEST">Holiday Club</option>
          <option value="basicform">Event</option>
          <option value="newform">Accident</option>
        </select>
      </form>
    </div>
  </nav>
);

Header.propTypes = {
  onChange: PropTypes.func,
};

export default Header;
