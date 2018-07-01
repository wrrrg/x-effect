import axios from "axios";
import React from "react";
import { Redirect, Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      conf_password: "",
      errorMessage: "",
      redirectToReferrer: false
    };
  }

  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password != this.state.conf_password) {
      this.setState({
        errorMessage: "Passwords do not match"
      });
      return false;
    }
    e.preventDefault();
    axios
      .post("/api/auth/register", this.state)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("xeffect-jwt", res.data.jwt);
          this.setState({
            redirectToReferrer: true
          });
        } else {
          this.setState({
            errorMessage: res.data.message
          });
        }
      })
      .catch(err => {
        // eventually handle this
        console.log(err);
      });
  };

  renderMessage = () => {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    } else {
      return null;
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    const messages = this.renderMessage();
    return (
      <div>
        {messages}
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="conf_password"
              value={this.state.conf_password}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link
          to={{
            pathname: "/auth/login",
            state: { from }
          }}
        >
          Login
        </Link>
      </div>
    );
  }
}

export default Register;
