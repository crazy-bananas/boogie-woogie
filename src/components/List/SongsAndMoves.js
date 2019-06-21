import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

class SongsAndMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      moves: []
    };
  }
  handleClick(index) {
    const newState = [...this.state.moves];
    newState[index] = !newState[index];
    this.setState({ moves: newState });
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
        {this.props.songList.map((song, index) => {
          return (
            <div key={index + "div"}>
              <ListItem
                key={index}
                button
                onClick={() => this.handleClick(index)}
              >
                <ListItemIcon>
                  <MusicNote />
                </ListItemIcon>
                <ListItemText primary={song.title} />
                {!!this.state.moves[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={!!this.state.moves[index]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem button>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItem>
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    );
  }
}

export default SongsAndMoves;
