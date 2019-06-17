import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";
import RecordWindow from "./components/RecordWindow";
import FinishRecording from "./components/FinishRecording";
import Score from "./components/Score";
import Login from "./components/Login";
import MoveSelection from "./components/MoveSelection";

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
    return (
      <div className="App">
        <Navbar />
        {this.showMenu() && <SongMenu />}
        {this.props.isSongSelected &&
          !this.props.isDanceFinished &&
          this.props.moveSelected.length === 0 && <MoveSelection />}
        {this.props.isSongSelected &&
          !this.props.isDanceFinished &&
          this.props.moveSelected.length !== 0 && <DanceWindow />}

        {this.props.isRecording && !this.props.isAudioFinished && (
          <RecordWindow />
        )}
        {this.props.isRecording && this.props.isAudioFinished && (
          <FinishRecording />
        )}

        {this.props.isSongSelected && this.props.isAudioFinished && <Score />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSongSelected: state.isSongSelected,
    isDanceFinished: state.isDanceFinished,
    isRecording: state.isRecording,
    isAudioFinished: state.isAudioFinished,
    isUserLoggedIn: state.isUserLoggedIn,
    checkProfile: state.checkProfile,
    moveSelected: state.moveSelected
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
