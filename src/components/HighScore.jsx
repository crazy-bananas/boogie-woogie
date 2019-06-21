import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "./Loading";
import ScoreTable from "./ScoreTable";

class HighShcore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreList: -1
    };
  }
  fetchUsersScores = () => {
    axios
      .get(
        `
      https://boogie-banana.herokuapp.com/api/scores/${this.props.songSelected}/${this.props.moveSelected}/`
      )
      .then(data => {
        this.setState({ scoreList: data.data });
      });
  };
  componentDidMount() {
    this.fetchUsersScores();
  }
  isDataFetched = () => {
    if (this.state.scoreList === -1) {
      return <Loading />;
    }
    return <ScoreTable scoreList={this.state.scoreList} />;
  };
  render() {
    return this.isDataFetched();
  }
}
const mapStateToProps = state => {
  return {
    currentScore: state.currentScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected
  };
};

export default connect(mapStateToProps)(HighShcore);
