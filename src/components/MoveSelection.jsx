import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { styled } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import "../styles/moveselection.css";

const MyList = styled(List)({
  background: "rgba(218, 218, 218, 0.7)"
});

const MyListItem = styled(ListItem)({
  background: "rgba(242, 242, 242, 0.5);",
  width: "50vh"
});

export class HighScoreList extends Component {
  constructor(props) {
    super(props);
    // add song name or make song name global.
    this.state = { moves: [], selectedMoveId: "", title: "", open: true };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

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
            title: "Sorry no moves are registered for this Song."
          });
        }

        console.log(data);
      });
  }
  render() {
    return (
      <div id="move-selection">
        <h1>{this.state.title}</h1>
        <Grid container justify="center">
          <MyList component="div">
            {this.state.moves.length !== 0 &&
              this.state.moves.map((move, index) => {
                {
                  return (
                    <MyListItem
                      button
                      onClick={this.props.setSelectedMoveId}
                      key={index}
                      data-key={move._id}
                      data-index={index}
                    >
                      {move.name}
                    </MyListItem>
                  );
                }
              })}
          </MyList>
        </Grid>
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
