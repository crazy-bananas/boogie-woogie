import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";
import RecordWindow from "./components/RecordWindow";
import FinishRecording from "./components/FinishRecording";
import Score from "./components/Score";

class App extends Component {
  login = () => {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  showMenu = () => {
    if (this.props.isSongSelected || this.props.isRecording) {
      return false;
    }
    return true;
  };
  render() {
    return (
      <div className="App">
        <Navbar auth={this.props.auth} />
          {this.showMenu() && <SongMenu />}

          {this.props.isSongSelected && !this.props.isDanceFinished && (
            <DanceWindow />
          )}

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
