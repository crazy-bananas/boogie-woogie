import React, { Component } from "react";

import { connect } from "react-redux";
import axios from "axios";

export class HighScoreList extends Component {
  constructor(props) {
    super(props);
    this.state = { moves: [], selectedMoveId: "", title: "" };
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
        if (data.data.length !== 0) {
          this.setState({ moves: data.data });
          this.setState({
            title: "Please select which movies you like to dance to"
          });
        } else {
          this.setState({
            title:
              "Sorry no moves are registered for this Song."
          });
        }

        console.log(data);
      });
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {this.state.moves.length !== 0 &&
          this.state.moves.map((move, index) => {
            return (
              <h1
                key={index}
                data-key={move._id}
                data-index={index}
                onClick={this.props.setSelectedMoveId}
              >
                MOVES: {move.name}
              </h1>
            );
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
