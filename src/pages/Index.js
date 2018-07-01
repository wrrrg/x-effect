import React from "react";
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
        {!this.state.isClicked && <SingleX handleXClick={this.handleXClick} />}
        <p>{this.state.message}</p>
      </div>
    );
  }
}
