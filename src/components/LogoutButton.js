import React from "react";
import { Redirect } from "react-router-dom";

class LogoutButton extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  handleLogout = () => {
    localStorage.removeItem("xeffect-jwt");
    this.setState({ clicked: true });
  };

  render() {
    if (this.state.clicked) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <button className="btn-primary btn-logout" onClick={this.handleLogout}>
          Logout
        </button>
      );
    }
  }
}

export default LogoutButton;
