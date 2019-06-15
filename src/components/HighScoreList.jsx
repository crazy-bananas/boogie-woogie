import React, { Component } from "react";

import { connect } from "react-redux";
import axios from "axios";

export class HighScoreList extends Component {
  constructor(props) {
    super(props);
    this.state = { scoreList: [] };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:4000/api/scores/${this.props.songSelected}/${
          this.props.moveSelected
        }`
      )
      .then(data => {
        this.setState({ scoreList: data });
        console.log(data);
      });
  }
  render() {
    return (
      <div>
        {console.log("HIGH", this.state.scoreList)}
        {/* {this.state.scoreList.map(score => {
          return (
            <div>
              <li>{score.user}</li>
              <li>{score.score}</li>
            </div>
          );
        })} */}
        {/* After MVP 
            <Button color="inherit">Login</Button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songSelected: state.songSelected,
    moveSelected: state.moveSelected
  };
};

export default connect(mapStateToProps)(HighScoreList);
