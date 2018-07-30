import React from "react";

import Index from "../pages/VisibleHabitsWrapper";
import AddHabit from "../pages/AddHabit";
import { Route } from "react-router-dom";
import Header from "./Header";

const ContentWrapper = () => (
  <div>
    <Header />
    <div className="container">
      <Route path="/" component={Index} />
      <Route path="/add" component={AddHabit} />
    </div>
  </div>
);

export default ContentWrapper;
