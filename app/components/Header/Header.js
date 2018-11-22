import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/calendar">
            Calendar
          </Link>
          <Link className="router-link" to="/reminder">
            New Reminder
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
