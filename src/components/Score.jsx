import React, { Component } from "react";
import { connect } from "react-redux";
import ScoreCard from "./ScoreCard";
import Retry from "./Retry";
import LoadingScore from "./LoadingScore";

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingScore: true };
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
          <div>
            <ScoreCard />
            <Retry />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentScore: state.currentScore
  };
};

export default connect(mapStateToProps)(Score);
