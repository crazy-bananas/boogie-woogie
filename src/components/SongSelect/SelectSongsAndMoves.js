import React, { Component } from "react";
import { connect } from "react-redux";
import SongLoading from "../SongLoading";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import MusicNote from "@material-ui/icons/MusicNote";
import axios from "axios";

const CancelToken = axios.CancelToken;
const cancelAxios = CancelToken.source();

class SelectSongsAndMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShow: [],
      moves: []
    };
  }
  handleClick(index) {
    const newState = [...this.state.shouldShow];
    newState[index] = !newState[index];
    this.setState({ shouldShow: newState });
  }

  componentDidMount() {
    if (this.state.moves.length === 0 && this.props.songList.length !== 0) {
      for (let i = 0; i < this.props.songList.length; ++i) {
        axios
          .get(
            `https://boogie-banana.herokuapp.com/api/moves/${this.props.songList[i].code}`,
            {
              cancelToken: cancelAxios.token
            }
          )
          .then(reply => {
            const newMovesSet = [...this.state.moves];
            newMovesSet[i] = reply.data;
            this.setState({ moves: newMovesSet });
          })
          .catch(err => {
            if (axios.isCancel(err)) {
              console.log(
                "Axios request in SelectSongsAndMoves.js to fetch moves data was cancelled.",
                err.message
              );
            } else {
              throw new Error(err.message);
            }
          });
      }
    }
  }

  componentWillUnmount() {
    cancelAxios.cancel("Operation canceled by the user.");
  }

  render() {
    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Avaiable Songs
          </ListSubheader>
        }
      >
        {this.props.songList.map((song, songIndex) => {
          return (
            <div key={songIndex + "div"}>
              <ListItem
                key={songIndex}
                button
                onClick={() => this.handleClick(songIndex)}
              >
                <ListItemIcon>
                  <MusicNote />
                </ListItemIcon>
                <ListItemText primary={song.title} />
                {!!this.state.shouldShow[songIndex] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={!!this.state.shouldShow[songIndex]}
                timeout="auto"
                unmountOnExit
                key={"SongLoading" + songIndex}
              >
                {!this.state.moves[songIndex] ? (
                  <SongLoading />
                ) : (
                  this.state.moves[songIndex].map((move, moveIndex) => {
                    return (
                      <List key={moveIndex} component="div" disablePadding>
                        <ListItem button>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText
                            primary={move.name}
                            onClick={() => {
                              this.props.playSong({
                                song: this.props.songList[songIndex].code,
                                selectedMoves: move._id
                              });
                            }}
                          />
                        </ListItem>
                      </List>
                    );
                  })
                )}
              </Collapse>
            </div>
          );
        })}
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playSong: songAndMoves => {
      dispatch({
        type: "SELECT_SONG_AND_MOVES",
        payload: {
          selectedSong: songAndMoves.song,
          selectedMoves: songAndMoves.selectedMoves
        }
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SelectSongsAndMoves);
