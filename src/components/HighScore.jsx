import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "./Loading";
import ScoreTable from "./ScoreTable";

const CancelToken = axios.CancelToken;
const cancelAxios = CancelToken.source();

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
      https://boogie-banana.herokuapp.com/api/scores/${this.props.songSelected}/${this.props.moveSelected}/`,
        {
          cancelToken: cancelAxios.token
        }
      )
      .then(data => {
        this.setState({ scoreList: data.data });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log(
            "Axios request in HighScore.jsx to fetch dance moves was cancelled.",
            err.message
          );
        } else {
          throw new Error(err.message);
        }
      });
  };
  componentDidMount() {
    this.fetchUsersScores();
  }

  componentWillUnmount() {
    cancelAxios.cancel("Operation canceled by the user.");
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
