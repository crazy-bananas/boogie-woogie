import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import routing from "./routes";

const initialState = {
  userAuthInfo:"",
  isSongSelected: false,
  songSelected: "",
  moveSelected: "",
  totalScore: 0,
  maxScore: 0,
  isUserLoggedIn: true,
  isCountdownFinished: false,
  isUserReady: true,
  isDanceFinished: false,
  isAudioFinished: false,
  newSong: {
    //   artist: "",
    title: "",
    code: "",
    moves: []
  },
  isRecording: false
};

const appReducer = (state = initialState, action) => {
  console.log(action.type);
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

    case "UPDATE_TOTAL_SCORE": {
      const newState = { ...state };
      newState.totalScore = action.payload.userScore;
      return newState;
    }

    case "UPDATE_MAXSCORE": {
      const newState = { ...state };
      newState.maxScore = action.maxScore;
      return newState;
    }

    case "AUDIO_FINISHED": {
      const newState = { ...state };
      newState.isAudioFinished = true;
      console.log("AUDIO FINISHED");
      return newState;
    }

    case "RESET_STATE": {
      console.log("RESETTING STATE");
      return { ...initialState };
    }
    case "RETRY_DANCE": {
      const newState = { ...initialState };
      newState.isSongSelected = true;
      newState.songSelected = state.songSelected;
      return newState;
    }
    case "ADD_NEW_SONG": {
      const newState = { ...state };
      newState.newSong.artist = action.payload.artist;
      newState.newSong.title = action.payload.title;
      newState.newSong.code = action.payload.code;

      newState.isRecording = !state.isRecording;
      return newState;
    }
    case "ADD_NEW_MOVES": {
      const newState = { ...state };
      newState.newSong.moves = action.payload;

      return newState;
    }

    case "SELECTED_MOVEID": {
      const newState = { ...state };
      console.log(action.payload);
      newState.moveSelected = action.payload;
      return newState;
    }

    case "USER_AUTH_INFO": {
      const newState = { ...state };
      newState.userAuthInfo = action.payload;
      console.log(state)
      return newState;
    }

    default:
      return state;
  }
};
const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>{routing()}</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
