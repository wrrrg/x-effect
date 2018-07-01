import axios from "axios";
import React from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isAuthenticated: false
    };
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate = () => {
    const jwt = localStorage.getItem("xeffect-jwt");
    if (!jwt) {
      this.setState({ loaded: true, isAuthenticated: false });
    } else {
      axios
        .post(
          "/api/auth/authenticate",
          {
            token: jwt
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.setState({
            loaded: true,
            isAuthenticated: res.data.success
          });
        })
        .catch(err => {
          // eventually handle this
          console.log(err);
        });
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth/login",
                from: props.location
              }}
            />
          );
        }}
      />
    );
  }
}

export default PrivateRoute;
