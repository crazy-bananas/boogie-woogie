import React, { Component } from "react";
import Navbar from "./Navbar";
import SongMenu from "./SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./DanceWindow";
import RecordWindow from "./Record/RecordWindow";
import FinishRecording from "./Record/FinishRecording";
import Score from "./HighScore/Score";
import axios from "axios";

const CancelToken = axios.CancelToken;
const cancelAxios = CancelToken.source();

class App extends Component {
  async componentDidMount() {
    // if (this.props.location.pathname !== "/callback") {
    //   try {
    //     await this.props.auth.silentAuth();
    //     this.forceUpdate();
    //   } catch (err) {
    //     if (err.error !== "login_required") console.log(err.error);
    //   }
    // }

    if (localStorage.getItem("isLoggedIn")) {
      axios
        .get("https://dev-boogie-woogie.auth0.com/userinfo", {
          headers: {
            Authorization: `Bearer ${this.props.auth.getAccessToken()}`
          },
          cancelToken: cancelAxios.token
        })
        .then(responseWithUserInfo => {
          return responseWithUserInfo.data;
        })
        .then(userInfo => {
          localStorage.setItem("user-email", userInfo.email);
          localStorage.setItem("user-name", userInfo.name);
          localStorage.setItem("user-nickname", userInfo.nickname);
          localStorage.setItem("user-picture", userInfo.picture);
          localStorage.setItem("user-id", userInfo.sub);

          axios.post("https://boogie-banana.herokuapp.com/api/users", {
            userId: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            nickname: userInfo.nickname,
            picture: userInfo.picture,
            updated_at: userInfo.updated_at
          });

          this.props.updateProfilePicture(userInfo.picture);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log(
              "Axios request in Play.jsx to fetch user info was canceled.",
              err.message
            );
          } else {
            throw new Error(err.message);
          }
        });
    }
  }

  componentWillUnmount() {
    cancelAxios.cancel("Operation canceled by the user.");
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
        {this.showMenu() && <SongMenu auth={this.props.auth} />}

        {this.props.isSongSelected &&
          !this.props.isAudioFinished &&
          this.props.moveSelected.length !== 0 && <DanceWindow />}

        {this.props.isSongSelected && this.props.isAudioFinished && <Score />}

        {this.props.isRecording && !this.props.isAudioFinished && (
          <RecordWindow />
        )}

        {this.props.isRecording && this.props.isAudioFinished && (
          <FinishRecording />
        )}
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
    updateProfilePicture: pictureUrl => {
      dispatch({
        type: "UPDATE_USER_PICTURE",
        payload: pictureUrl
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
