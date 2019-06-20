import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import Retry from "./Retry";
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
    this.startLoading();
  }
  render() {
    return (
      <div>
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
