import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark col-md-2 col-sm-12">
      <Link
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        to="/"
      >
        <span className="fs-4">Periodic Tables</span>
      </Link>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">
            <span className="oi oi-dashboard" />
            &nbsp;Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/search">
            <span className="oi oi-magnifying-glass" />
            &nbsp;Search
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/reservations/new">
            <span className="oi oi-plus" />
            &nbsp;New Reservation
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/tables/new">
            <span className="oi oi-layers" />
            &nbsp;New Table
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
