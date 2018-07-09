import { connect } from "react-redux";
import { updateHabit } from "../actions/habits";
import DailyHabitsList from "../components/DailyHabitsList";

// const handleXClick = () => {
//   alert("clicked");
//   updateHabit();
// };

const mapStateToProps = state => {
  return {
    habits: state.habits
  };
};
const mapDispatchToProps = dispatch => ({
  updateHabit: id => dispatch(updateHabit(id, { completed: true }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyHabitsList);

// handleXClick = () => {
//   this.setState(prevState => ({
//     isClicked: !prevState.isClicked,
//     message: "Great job!"
//   }));
// };

// handleXClick={this.handleXClick}
