import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import Retry from "./Retry";
import HighScore from "./HighScore";
import "../styles/scores.css";

class Score extends Component {
  render() {
    return (
      <div id="scores">
        <ScoreCard />
        <HighScore />
        <Retry />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentScore: state.currentScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected
  };
};

export default connect(mapStateToProps)(Score);
