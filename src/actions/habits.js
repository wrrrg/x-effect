// Action files are functions that will be passed in our reducers to modify our redux store. You can see them called in the reducers/habitsReducers.js file

import uuid from "uuid";

// addHabit({
//   description: "Didn't smoke cigarettes today",
//   name: "Quit Smoking",
//   createdAt: 67676767,
//   completed: false,
//   frequency: "daily",
//   goalQuantity: null,
//   goalConsecutive: null,
//   endDate: 800000000000
// })
export const addHabit = ({
  description = "",
  name = "",
  createdAt = 0,
  completed = false,
  frequency = "daily",
  goalQuantity = null,
  goalConsecutive = null,
  endDate = 1
} = {}) => ({
  type: "ADD_HABIT",
  habit: {
    id: uuid(),
    description,
    name,
    createdAt,
    completed,
    frequency,
    goalQuantity,
    goalConsecutive,
    endDate
  }
});

export const updateHabit = (id, updates) => ({
  type: "UPDATE_HABIT",
  id,
  updates
});
