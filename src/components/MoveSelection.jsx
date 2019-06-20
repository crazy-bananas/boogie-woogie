import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Loading from "./Loading";

import { styled } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MusicVideo from "@material-ui/icons/MusicVideo";
import Grid from "@material-ui/core/Grid";
import "../styles/moveselection.css";

const MyList = styled(List)({
  background: "rgba(218, 218, 218, 0.7)",
  maxWidth: "50%",
  minWidth: "25%"
});

const MyListItem = styled(ListItem)({
  width: "50vh"
});

export class MoveSelection extends Component {
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
          this.setState({
            moves: data.data,
            title: "Please select which move you like to dance to"
          });
        } else {
          this.setState({
            title: "Sorry no moves are registered for this Song."
          });
        }
      });
  }

  isDataFetched = () => {
    if (this.state.moves.length > 0) {
      return (
        <div id="move-selection">
          <h1>{this.state.title}</h1>
          <Grid container justify="center">
            <MyList>
            {this.state.moves.length !== 0 &&
              this.state.moves.map((move, index) => {
                return (
                  <ListItem 
                    style ={{display:"inline-flex"}}
                    key={index}
                    button
                  >
                    <ListItemIcon>
                      <MusicVideo />
                    </ListItemIcon>
                    <MyListItem
                      style={{ margin: 0, padding: 0 }}
                      key={index}
                      data-key={move._id}
                      data-index={index}
                      onClick={e => this.props.setSelectedMoveId(e)}
                    >
                      {move.name}
                    </MyListItem>
                  </ListItem>
                );
                })
              }
            </MyList>
          </Grid>
        </div>
      );
    }
    return <Loading />;
  };
  render() {
    return this.isDataFetched();
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
)(MoveSelection);
