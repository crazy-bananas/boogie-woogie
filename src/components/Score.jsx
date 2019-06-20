import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import HighScore from "./HighScore";

import "../styles/scores.css";
import LoadingScore from "./animation/LoadingScore";

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = { scoreList: [], loadingScore: true };
  }
  startLoading = () => {
    let endTimeout = setTimeout(() => {
      this.setState({ loadingScore: false });
      clearTimeout(endTimeout);
    }, 1500);
  };
  componentDidMount() {
    console.log("DID MOUNT", this.props.currentScore);
    this.startLoading();
    // axios.post("https://boogie-banana.herokuapp.com/api/scores", {
    //   songId: this.props.songSelected,
    //   moveId: this.props.moveSelected,
    //   user: "Anonymous",
    //   score: this.props.currentScore
    // });
  }
  render() {
    return (
      <div>
        {console.log("DID RENDER", this.props.currentScore)}
        {this.state.loadingScore ? (
          <LoadingScore />
        ) : (
          <div id="scores">
            <ScoreCard />
            <HighScore />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentScore: state.totalScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected,
    username: state.userAuthInfo.nickname,
    userpic: state.userAuthInfo.picture
  };
};

export default connect(mapStateToProps)(Score);
