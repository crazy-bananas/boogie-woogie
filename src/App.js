import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";
import RecordWindow from "./components/RecordWindow";
import Score from "./components/Score";
import Auth from "./authentication/Auth"
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    auth.handleAuthentication();
}

handleAuthentication();

console.log("handed shit")

class App extends Component {  
  showMenu = () => {
    if (this.props.isSongSelected || this.props.isRecording) {
      return false;
    }
    return true;
  };
  render() {
    return (
      <div className="App">
        <Navbar auth={auth}/>
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
