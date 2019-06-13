import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";
import RecordWindow from "./components/RecordWindow";
import Score from "./components/Score";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";

class App extends Component {
  showMenu = () => {
    if (this.props.isSongSelected || this.props.isRecording) {
      return false;
    }
    return true;
  };
  loggedIn = () => {
    if (!this.props.isUserLoggedIn) {
      return <Login />;
    } 
      return (
        <div className="App">
          <Navbar />
          {this.showMenu() && <SongMenu />}
          {this.props.isSongSelected && !this.props.isDanceFinished && (
            <DanceWindow />
          )}
          {this.props.isRecording && !this.props.isAudioFinished && (
            <RecordWindow />
          )}
          {this.props.isAudioFinished && <Score />}
        </div>
      );
  };
  render() {
    return this.loggedIn();
  }
}

const mapStateToProps = state => {
  return {
    isSongSelected: state.isSongSelected,
    isDanceFinished: state.isDanceFinished,
    isRecording: state.isRecording,
    isAudioFinished: state.isAudioFinished,
    isUserLoggedIn: state.isUserLoggedIn,
    checkProfile: state.checkProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
