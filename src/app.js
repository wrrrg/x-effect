import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { addHabit } from "./actions/habits";
import AppRouter from "./routers/AppRouter";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
// configureStore establishes a store
const store = configureStore();
// subscribe will update when changes are made to the store - you can see it log state each time
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

// each dispatch updates the store, in this case we are adding habits using my actions/habits function.
// You can repeat this with different data to map more habits
store.dispatch(
  addHabit({
    description: "Didn't smoke cigarettes today",
    name: "Quit Smoking",
    createdAt: 67676767
  })
);

store.dispatch(
  addHabit({
    description: "Stretched 20 Minutes Today",
    name: "Improve Flexibility",
    createdAt: 555555
  })
);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
