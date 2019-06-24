import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "./Loading";
import ScoreTable from "./ScoreTable";

class HighShcore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreList: undefined
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

  render() {
    if (this.state.scoreList === undefined) {
      return <Loading />;
    }
    return <ScoreTable scoreList={this.state.scoreList} />;
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
