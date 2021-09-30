import React from "react";
import Menu from "./Menu";

import "./Layout.css";
import Routes from "./Routes";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <Menu />
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
