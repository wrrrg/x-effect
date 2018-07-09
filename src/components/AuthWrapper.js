import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorBoundary from "./ErrorBoundary";

const AuthWrapper = () => (
  <div>
    <div className="header">
      <h1 className="header__title">Sign In</h1>
    </div>
    <div id="auth-container">
      <ErrorBoundary>
        <Route path="/auth/login" component={Login} />
      </ErrorBoundary>
      <Route path="/auth/register" component={Register} />
    </div>
  </div>
);

export default AuthWrapper;
