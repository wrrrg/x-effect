import React from "react";
import LogoutButton from "./LogoutButton";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <h1 className="header__title">Did you meet your goal today?</h1>
      <LogoutButton />
      <NavLink to="/add" activeClassName="is-active">
        Add Habit(s)
      </NavLink>
      <NavLink to="/" activeClassName="">
        View Habits
      </NavLink>
    </div>
  );
};

export default Header;
