import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  isSongSelected: false,
  songSelected: "",
  totalScore: 0,
  maxScore: 0,
  songList: [
    {
      artist: "NHK",
      title: "Radio Taiso",
      url:
        "https://boogie-woogie-banana.s3-ap-northeast-1.amazonaws.com/radio-taiso-33s.mov"
    },
    {
      artist: "CC",
      title: "EIGHT",
      url: "https://soundcloud.com/instanthellmurder/radio-taiso-workout"
    }
  ],
  isUserLoggedIn:true,
  isCountdownFinished: false,
  isUserReady: true,
  isDanceFinished: false,
  isAudioFinished: false,
  newSong: {
    artist: "",
    title: "",
    url: "",
    moves: []
  },
  isRecording: false
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

    case "UPDATE_TOTAL_SCORE": {
      const newState = { ...state };
      newState.totalScore = action.payload.userScore;
      newState.maxScore = action.payload.maxScore;
      return newState;
    }
    case "AUDIO_FINISHED": {
      const newState = { ...state };
      newState.isAudioFinished = true;
      return newState;
    }

    case "RESET_STATE": {
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
      newState.newSong.url = action.payload.songUrl.substring(
        action.payload.songUrl.indexOf("=") + 1
      );
      newState.songList.push(action.payload);
      newState.songSelected = newState.songList.length - 1;
      newState.isRecording = !state.isRecording;
      return newState;
    }
    case "ADD_NEW_MOVES": {
      const newState = { ...state };
      newState.newSong.moves = action.payload;
      console.log(newState.newSong.moves);
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
