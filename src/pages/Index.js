import React from "react";
import { Header } from "./../components/Header";
import SingleX from "./../components/SingleX";

export default class Index extends React.Component {
  state = {
    isClicked: false,
    message: "Did you meet your goals today?"
  };

  handleXClick = () => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
      message: "Great job!"
    }));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {!this.state.isClicked && (
            <SingleX handleXClick={this.handleXClick} />
          )}
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}
