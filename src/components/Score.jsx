import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import Retry from "./Retry";

class Score extends Component {
  render() {
    return (
      <div>
        <ScoreCard />
        <Retry />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentScore: state.currentScore
  };
};

export default connect(mapStateToProps)(Score);
