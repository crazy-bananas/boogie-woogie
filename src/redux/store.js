import { createStore } from "redux";

const initialState = {
  isSongSelected: false,
  songSelected: "",
  moveSelected: "",
  totalScore: 0,
  maxScore: 0,
  combo: 0,
  isUserLoggedIn: true,
  isCountdownFinished: false,
  isUserReady: true,
  isAudioFinished: false,
  newSong: {
    title: "",
    code: "",
    moves: []
  },
  isRecording: false,
  userAuthInfo: {},
  time: 0
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

    case "UPDATE_COMBO": {
      const newState = { ...state };
      newState.combo = action.combo;
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
      newState.moveSelected = action.payload;
      return newState;
    }

    case "USER_AUTH_INFO": {
      const newState = { ...state };
      newState.userAuthInfo = action.payload;
      return newState;
    }

    case "SET_TIMER": {
      const newState = { ...state };
      console.log("TIMER", action.payload);
      newState.time = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

const store = createStore(appReducer);

export default store;
