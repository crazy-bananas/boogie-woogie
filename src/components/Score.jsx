import React, { Component } from "react";
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

export default Score;
