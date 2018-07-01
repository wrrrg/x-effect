import React from "react";
import { Route } from "react-router-dom";
import Login from "./../pages/Login";
import Register from "./../pages/Register";

const AuthWrapper = () => (
  <div>
    <div className="header">
      <h1 className="header__title">Sign In</h1>
    </div>
    <div className="container">
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
    </div>
  </div>
);

export default AuthWrapper;
