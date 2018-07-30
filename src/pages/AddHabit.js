import React from "react";
import HabitForm from "../components/HabitForm";
import { addHabit } from "../actions/habits";
import { connect } from "react-redux";
import Header from "../components/Header";

const AddHabit = props => (
  <div>
    <Header />
    <div className="habits-form">
      <HabitForm
        onSubmit={habit => {
          console.log(habit);
          props.dispatch(addHabit(habit));
          props.history.push("/");
        }}
      />
    </div>
  </div>
);

export default connect()(AddHabit);
