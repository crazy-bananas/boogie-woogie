import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";
import RecordWindow from "./components/RecordWindow";
import FinishRecording from "./components/FinishRecording";
import Score from "./components/Score";
<<<<<<< HEAD
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import HighScore from "./components/HighScore";
=======
import MoveSelection from "./components/MoveSelection";
>>>>>>> 9c8c5b5f2d56ba6b27fd786010a409fa8404c5d3

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
<<<<<<< HEAD
  loggedIn = () => {
    if (!this.props.isUserLoggedIn) {
      return (<div>
        <HighScore/>
         </div>)
    }
    return (
      <div className="App">
        <Navbar />
        {this.showMenu() && <SongMenu />}
        {this.props.isSongSelected && !this.props.isDanceFinished && (
          <DanceWindow />
        )}
=======
  render() {
    return (
      <div className="App">
        <Navbar auth={this.props.auth} />
        {this.showMenu() && <SongMenu />}

        {this.props.isSongSelected &&
          !this.props.isDanceFinished &&
          this.props.moveSelected.length === 0 && <MoveSelection />}

        {this.props.isSongSelected &&
          !this.props.isDanceFinished &&
          this.props.moveSelected.length !== 0 && <DanceWindow />}
>>>>>>> 9c8c5b5f2d56ba6b27fd786010a409fa8404c5d3

        {this.props.isRecording && !this.props.isAudioFinished && (
          <RecordWindow />
        )}

        {this.props.isRecording && this.props.isAudioFinished && (
          <FinishRecording />
        )}

        {this.props.isSongSelected && this.props.isAudioFinished && <Score />}
      </div>
    
      ////////
      // <div className="App">
      //   <Navbar />
      //   {this.showMenu() && <SongMenu />}
      //   {this.props.isSongSelected && !this.props.isDanceFinished && (
      //     <DanceWindow />
      //   )}
      //   {this.props.isRecording && !this.props.isAudioFinished && (
      //     <RecordWindow />
      //   )}
      //   {this.props.isAudioFinished && <Score />}
      // </div>
    );
  };
  render() {
    return (
      this.loggedIn()
    )
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
