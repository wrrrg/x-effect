import axios from "axios";
import React from "react";
import { Redirect, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

library.add(fab);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      redirectToReferrer: false,
      facebookAppId: "",
      googleClientId: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/auth/social_clients")
      .then(res => {
        this.setState({
          facebookAppId: res.data.fb_app_id,
          googleClientId: res.data.google_client_id
        });
      })
      .catch(err => {
        this.setState({
          errorMessage: `An error occurred: ${err}`
        });
      });
  }

  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  getMessages = () => {
    if (this.state.errorMessage) {
      return <div className="error-message">{this.state.errorMessage}</div>;
    } else {
      return null;
    }
  };

  login = userInfo => {
    axios
      .post("/api/auth/login", userInfo)
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
        this.setState({
          errorMessage: err.message
        });
      });
  };

  checkInput = inputs => {
    for (var key in inputs) {
      if (inputs[key] == "") {
        return "Please fill out the missing fields";
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const inputError = this.checkInput({
      Email: this.state.email,
      Password: this.state.password
    });
    if (!inputError) {
      this.login(Object.assign({ type: "email" }, this.state));
    } else {
      this.setState({
        errorMessage: inputError
      });
    }
  };

  responseFacebook = res => {
    this.login({
      first_name: res.first_name,
      last_name: res.last_name,
      email: res.email,
      type: "facebook"
    });
  };

  responseGoogle = res => {
    if (res.error) {
      this.setState({
        errorMessage: res.details
      });
    } else {
      this.login({
        first_name: res.profileObj.givenName,
        last_name: res.profileObj.familyName,
        email: res.profileObj.email,
        type: "google"
      });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    const messages = this.getMessages();
    if (this.state.facebookAppId && this.state.googleClientId) {
      return (
        <div className="auth-login">
          {messages}
          <form className="auth-form" onSubmit={this.handleSubmit}>
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
            <input className="btn-primary" type="submit" value="Submit" />
          </form>
          <p>-</p>
          <FacebookLogin
            appId={this.state.facebookAppId}
            fields="first_name, last_name, email"
            callback={this.responseFacebook}
            icon={<FontAwesomeIcon icon={["fab", "facebook"]} />}
            size="small"
            textButton="&nbsp;&nbsp;CONTINUE WITH FACEBOOK"
          />
          <GoogleLogin
            clientId={this.state.googleClientId}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          >
            <FontAwesomeIcon icon={["fab", "google"]} />
            <span>&nbsp;&nbsp;CONTINUE WITH GOOGLE</span>
          </GoogleLogin>
          <Link
            to={{
              pathname: "/auth/register",
              state: { from }
            }}
          >
            Create Account
          </Link>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Login;
