import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  isSongSelected: false,
  songSelected: -1,
  songList: [
    {
      artist: "NHK",
      title: "Radio Taiso",
      url:
        "https://boogie-woogie-banana.s3-ap-northeast-1.amazonaws.com/radio_taiso.mp3"
    },
    {
      artist: "CC",
      title: "EIGHT",
      url:
        "https://boogie-woogie-banana.s3-ap-northeast-1.amazonaws.com/radio_taiso.mp3"
    }
  ],
  isCountdownFinished: false,
  isUserReady: false,
  isDanceFinished: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_SONG": {
      const newState = { ...state };
      newState.isSongSelected = true;
      newState.songSelected = action.payload;
      return newState;
    }
    case "COUNTDOWN_FINISHED": {
      const newState = { ...state };
      newState.isCountdownFinished = true;

      return newState;
    }
    case "USER_READY": {
      const newState = { ...state };
      newState.isUserReady = true;
      return newState;
    }

    case "DANCE_FINISHED": {
      const newState = { ...state };
      newState.isDanceFinished = true;
      return newState;
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
