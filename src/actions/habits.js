// Action files are functions that will be passed in our reducers to modify our redux store. You can see them called in the reducers/habitsReducers.js file

import uuid from "uuid";

export const addHabit = ({
  description = "",
  name = "",
  createdAt = 0,
  completed = false
} = {}) => ({
  type: "ADD_HABIT",
  habit: {
    id: uuid(),
    description,
    name,
    createdAt,
    completed
  }
});

export const updateHabit = (id, updates) => ({
  type: "UPDATE_HABIT",
  id,
  updates
});
