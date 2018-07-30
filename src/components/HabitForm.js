import React, { Component } from "react";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name ? props.habit.name : "",
      description: props.description ? props.habit.description : "",
      frequency: props.frequency ? props.habit.frequency : "daily",
      goalQuantity: props.goalQuantity ? props.habit.goalQuantity : 0,
      goalConsecutive: props.goalConsecutive ? props.habit.goalConsecutive : 0,
      endDate: props.endDate ? props.habit.endDate : 0,
      errorMessage: ""
    };
  }

  handleNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({
      name
    }));
  };

  handleDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({
      description
    }));
  };

  handleFrequencyChange = e => {
    const frequency = e.target.value;
    this.setState(() => ({
      frequency
    }));
  };

  handleGoalQuantityChange = e => {
    const goalQuantity = e.target.value;
    this.setState(() => ({
      goalQuantity
    }));
  };

  handleGoalConsecutiveChange = e => {
    const goalConsecutive = e.target.value;
    this.setState(() => ({
      goalConsecutive
    }));
  };

  handleEndDateChange = e => {
    const endDate = e.target.value;
    this.setState(() => ({
      endDate
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    const errorMessage = "please enter valid information for your new habit";

    if (!this.state.name || !this.state.description || !this.state.frequency) {
      this.setState(() => ({
        errorMessage
      }));
    } else {
      this.props.onSubmit({
        name: this.state.name,
        description: this.state.description,
        frequency: this.state.frequency,
        goalQuantity: this.state.goalQuantity,
        goalConsecutive: this.state.goalConsecutive,
        endDate: this.state.endDate
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Habit Name:</label>
          <input
            type="text"
            placeholder="Name of habit e.g. 'Quit Smoking.'"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <label>Habit Description: </label>
          <input
            type="text"
            placeholder="Description of habit needs (optional)"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <label>Habit Frequency: </label>
          <select
            value={this.state.frequency}
            onChange={this.handleFrequencyChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <label>Goal - Quantity (optional)</label>
          <input
            type="number"
            value={this.state.goalQuantity}
            onChange={this.handleGoalQuantityChange}
          />
          <label>Goal - Streak (optional)</label>
          <input
            type="number"
            value={this.state.goalConsecutively}
            onChange={this.state.handleGoalConsecutivelyChange}
          />
          <label>
            Goal - End Date (optional - pick a day you want to have completed
            your goal by.)
          </label>
          <input type="date" />
          <button>Submit Habit</button>
        </form>
      </div>
    );
  }
}
