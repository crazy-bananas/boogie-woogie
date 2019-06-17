import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import Retry from "./Retry";
import HighScore from "./HighScore";
import HighScoreList from "./HighScoreList";
import "../styles/scores.css";
import axios from "axios";
import LoadingScore from "./LoadingScore";

import "../styles/scores.css";

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
    axios.post("https://boogie-banana.herokuapp.com/api/scores", {
      songId: this.props.songSelected,
      moveId: this.props.moveSelected,
      user: "Anonymous",
      score: this.props.currentScore
    });
  }
  render() {
    return (
      <div>
        {this.state.loadingScore ? (
          <LoadingScore />
        ) : (
          <div>
            <ScoreCard />

            <HighScoreList scoreList={this.state.scoreList.data} />
            <HighScore scoreList={this.state.scoreList.data} />
            <Retry />
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
    moveSelected: state.moveSelected
  };
};

export default connect(mapStateToProps)(Score);
