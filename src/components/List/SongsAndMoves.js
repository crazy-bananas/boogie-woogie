import React, { Component } from "react";
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

class SongsAndMoves extends Component {
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

  componentDidUpdate() {
    if (this.state.moves.length === 0 && this.props.songList.length !== 0) {
      console.log("Console here", this.props.songList[0].code);
      for (let i = 0; i < this.props.songList.length; ++i) {
        axios
          .get(
            `https://boogie-banana.herokuapp.com/api/moves/${this.props.songList[i].code}`
          )
          .then(reply => {
            const newMovesSet = [...this.state.moves];
            newMovesSet[i] = reply.data;
            this.setState({ moves: newMovesSet });
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
    console.log("Songlist:", this.props.songList);
    console.log("Moves:", this.state.moves);
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
                {!!this.state.shouldShow[songIndex] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {!!this.state.moves[songIndex] &&
                this.state.moves[songIndex].map((move, moveIndex) => {
                  return (
                    <Collapse
                      in={!!this.state.shouldShow[songIndex]}
                      timeout="auto"
                      unmountOnExit
                      key={"moveIndex" + moveIndex}
                    >
                      <List component="div" disablePadding>
                        <ListItem button>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText
                            primary={move.name}
                            onClick={() => console.log(this.state.songs)}
                          />
                        </ListItem>
                      </List>
                    </Collapse>
                  );
                })}
            </div>
          );
        })}
      </List>
    );
  }
}

export default SongsAndMoves;
