import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header"
import Sidebar from "./Sidebar"

function Layout() {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <Header />
      </div>

      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>

        <main className="col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;