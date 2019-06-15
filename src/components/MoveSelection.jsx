import React, { Component } from "react";

import { connect } from "react-redux";
import axios from "axios";

export class HighScoreList extends Component {
  constructor(props) {
    super(props);
    this.state = { moves: [], selectedMoveId: "" };
  }
  componentDidMount() {
    axios
      .get(
        `https://boogie-banana.herokuapp.com/api/moves/${
          this.props.songSelected
        }
        `
      )
      .then(data => {
        this.setState({ moves: data.data });
        console.log(data);
      });
  }
  render() {
    return (
      <div>
        {this.state.moves.map((move, index) => {
          {
            return (
              <h1
                key={index}
                data-key={move._id}
                data-index={index}
                onClick={this.props.setSelectedMoveId}
              >
                MOVES: {move._id}
              </h1>
            );
          }
        })}
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

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMoveId: event => {
      dispatch({
        type: "SELECTED_MOVEID",
        payload: event.target.dataset.key
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighScoreList);
