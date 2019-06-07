import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";

class Score extends Component {
  render() {
    return (
      <div>
        <ScoreCard />
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
