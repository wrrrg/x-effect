import React from "react";
import LogoutButton from "./LogoutButton";
import Index from "../pages/VisibleHabitsWrapper";
import { Route } from "react-router-dom";

const ContentWrapper = () => (
  <div>
    <div className="header">
      <h1 className="header__title">Did you meet your goal today?</h1>
      <LogoutButton />
    </div>
    <div className="container">
      <Route path="/" component={Index} />
    </div>
  </div>
);

export default ContentWrapper;
