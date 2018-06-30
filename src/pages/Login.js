import axios from 'axios';
import React from "react";
import { Redirect, Link } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'errorMessage': '',
      'redirectToReferrer': false
    }
  }

  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    console.log("handleSubmit?")
    e.preventDefault();
    axios.post('/api/auth/login', this.state)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('xeffect-jwt', res.data.jwt)
          this.setState({
            redirectToReferrer: true
          })
        } else {
          this.setState({
            'errorMessage': res.data.message,
          })
        }
      })
      .catch((err) => {
        // eventually handle this
        console.log(err);
    })
  };

  getMessages = () => {
    if (this.state.errorMessage) {
      return (
        <p>{ this.state.errorMessage }</p>
      )
    } else {
      return null;
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />
    }
    const messages = this.getMessages();
    return (
      <div>
        { messages }
        <form onSubmit={this.handleSubmit}>
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
          <input type="submit" value="Submit" />
        </form>
        <Link to={{
          pathname: "/auth/register",
          state: { from }
        }}>Register</Link>
      </div>
    );
  }
}

export default Login;
