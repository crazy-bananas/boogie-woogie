import React, { Component } from "react";
import { connect } from "react-redux";

class Score extends Component {
  render() {
    return (
      <div>
        <h1>Your Score is: {this.props.currentScore} p</h1>
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
