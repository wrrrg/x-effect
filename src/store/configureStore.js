import { createStore, combineReducers } from "redux";
// import expensesReducer from "../reducers/expenses";
// import filtersReducer from "../reducers/filters";
import habitsReducer from "../reducers/habitsReducer";

// store created
export default () => {
  const store = createStore(combineReducers({ habits: habitsReducer }));

  return store;
};
