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

  checkInput = inputs => {
    for (var key in inputs) {
      if (inputs[key] == "") {
        return "Please fill out the missing fields";
      }
    }

    if (this.state.password != this.state.conf_password) {
      return "Passwords do not match";
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const inputError = this.checkInput({
      "First Name": this.state.first_name,
      "Last Name": this.state.last_name,
      Email: this.state.email,
      Password: this.state.password,
      "Confirm Password": this.state.conf_password
    });
    if (!inputError) {
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
    } else {
      this.setState({
        errorMessage: inputError
      });
    }
  };

  renderMessage = () => {
    if (this.state.errorMessage) {
      return <div className="error-message">{this.state.errorMessage}</div>;
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
      <div className="auth-register">
        {messages}
        <form className="auth-form" onSubmit={this.handleSubmit}>
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
          <input className="btn-primary" type="submit" value="Submit" />
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
