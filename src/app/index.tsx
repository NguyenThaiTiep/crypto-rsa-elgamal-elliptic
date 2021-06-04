import { createBrowserHistory } from "history";
import React from "react";
import { Redirect, Route, Router, Switch, useLocation } from "react-router-dom";
import logo from "../logo.svg";
import "./index.scss";

import { routes, RoutesApp } from "./router";
import { history } from "../service/history";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <div className={"HeaderItem"}></div>
        <div className="main-content">
          <RoutesApp />
        </div>

        <div className="footer"></div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
