import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <NavLink to="/">React App</NavLink>
      </div>

      <div className="top-bar-right">
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </div>

    </div>
  </div>
);
