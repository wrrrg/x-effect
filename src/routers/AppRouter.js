import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import AuthWrapper from "../components/AuthWrapper";
import ContentWrapper from "../components/ContentWrapper";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={ContentWrapper} />
        <Route path="/auth" component={AuthWrapper} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
