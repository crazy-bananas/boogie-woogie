import React, { Component } from "react";
import "../App.css";
import Navbar from "./Navbar";
import SongMenu from "./SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./DanceWindow";

import Score from "./Score";

import axios from "axios";

class App extends Component {
  // componentDidMount() {
  //   this.axiosCancelSource = axios.CancelToken.source();
  //   if (localStorage.getItem("isLoggedIn")) {
  //     axios
  //       .get("https://dev-boogie-woogie.auth0.com/userinfo", {
  //         headers: {
  //           Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  //         }
  //       })
  //       .then(responseWithUserInfo => {
  //         return responseWithUserInfo.data;
  //       })
  //       .then(userInfo => {
  //         localStorage.setItem("user", userInfo.sub);
  //         localStorage.setItem("picture", userInfo.picture);
  //         localStorage.setItem("email", userInfo.email);
  //         axios.post(
  //           "https://boogie-banana.herokuapp.com/api/users",
  //           {
  //             userId: userInfo.sub,
  //             email: userInfo.email,
  //             name: userInfo.name,
  //             nickname: userInfo.nickname,
  //             picture: userInfo.picture,
  //             updated_at: userInfo.updated_at
  //           },
  //           {
  //             cancelToken: this.axiosCancelSource.token
  //           }
  //         );
  //         this.props.userAuthInfo(userInfo);
  //       })
  //       .catch(err => {
  //         throw err;
  //       });
  //   }
  // }

  // componentWillUnmount() {
  //   this.axiosCancelSource.cancel("Component unmounted.");
  // }

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
        {this.showMenu() && <SongMenu auth={this.props.auth} />}
        {/* {this.props.isSongSelected &&
          !this.props.isAudioFinished &&
          this.props.moveSelected.length === 0 && <MoveSelection />} */}

        {this.props.isSongSelected &&
          !this.props.isAudioFinished &&
          this.props.moveSelected.length !== 0 && <DanceWindow />}

        {this.props.isSongSelected && this.props.isAudioFinished && <Score />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSongSelected: state.isSongSelected,
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
