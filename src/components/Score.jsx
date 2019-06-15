import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import Retry from "./Retry";
import HighScore from "./HighScore";
import HighScoreList from "./HighScoreList";
import "../styles/scores.css";
import axios from "axios";

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = { scoreList: [] };
  }
  componentDidMount() {
    console.log(this.props.currentScore);
    axios.post("http://localhost:4000/api/scores", {
      songId: this.props.songSelected,
      moveId: this.props.moveSelected,
      user: "Anonymous",
      score: this.props.currentScore
    });
  }
  render() {
    return (
      <div id="scores">
        <ScoreCard />
        {console.log(this.state.scoreList.data)}
        <HighScoreList scoreList={this.state.scoreList.data} />
        <HighScore scoreList={this.state.scoreList.data} />
        <Retry />
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
