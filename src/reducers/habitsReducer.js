const habitsReducerDefaultState = [];

export default (state = habitsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_HABIT":
      return [...state, action.habit];
    case "REMOVE_HABIT":
      return state.filter(({ id }) => id !== action.id);
    case "UPDATE_HABIT":
      return state.map(habit => {
        if (habit.id === action.id) {
          return {
            ...habit,
            ...action.updates
          };
        } else {
          return habit;
        }
      });

    // This edit action needs a different function - something about looking for changes.
    // Maybe we can have it look for different label or name or something.

    // case "EDIT_HABIT":
    // return state.map(habit => {
    //     if (habit.id === action.id) {
    //         return {
    //             ...habit,
    //             ...action.updates
    //         };
    //     } else {
    //         return habit
    //     }
    // });
    default:
      return state;
  }
};
