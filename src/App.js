import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";
import RecordWindow from "./components/RecordWindow";
import FinishRecording from "./components/FinishRecording";
import Score from "./components/Score";
import MoveSelection from "./components/MoveSelection";
import Profile from "./components/Profile";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("isLoggedIn")) {
      try {
        axios
          .get("https://dev-boogie-woogie.auth0.com/userinfo", {
            headers: {
              Authorization: `Bearer ${this.props.auth.getAccessToken()}`
            }
          })
          .then(responseWithUserInfo => {
            return responseWithUserInfo.data;
          })
          .then(userInfo => {
            // Update state
            this.props.userAuthInfo(userInfo);
          })
          .catch(err => {
            console.log("Please Login")
          });
      } catch (err) {
        throw err;
      }
    }else{
      console.log("please login")
    }
  }

  login = () => {
    this.props.auth.login();
  };

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
  return {
    userAuthInfo: data => {
      dispatch({
        type: "USER_AUTH_INFO",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
