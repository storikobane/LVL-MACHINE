import React from 'react';
    import { NavLink } from 'react-router-dom';
    import '../styles/navbar.css';

    function Navbar() {
      return (
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/lineups" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Lineups
              </NavLink>
            </li>
            <li>
              <NavLink to="/matchups" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Matchups
              </NavLink>
            </li>
            <li>
              <NavLink to="/matchhistory" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
               History
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Stats
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    }

    export default Navbar;
