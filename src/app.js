import React from "react";
import ReactDOM from "react-dom";
import PrivateRoute from './components/PrivateRoute';
import AuthWrapper from './components/AuthWrapper';
import ContentWrapper from './components/ContentWrapper';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import "normalize.css/normalize.css";
import "./styles/styles.scss";


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={ContentWrapper} />
        <Route path="/auth" component={AuthWrapper} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>,
  document.getElementById("app"));
