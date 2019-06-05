import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  songSelected: false,
  userReady: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLAY_SONG": {
      const newState = { ...state };
      newState.songSelected = true;
      return newState;
    }
    case "USER_READY": {
      const newStateUserReady = { ...state };
      newStateUserReady.userReady = true;
      return newStateUserReady;
    }
    default:
      return state;
  }
};
const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
