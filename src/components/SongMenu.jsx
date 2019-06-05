import React, { Component } from "react";
import { Audio } from "./Audio";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import songmenu from "../styles/songmenu.css";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MusicVideo from "@material-ui/icons/MusicVideo";
import MusicNote from "@material-ui/icons/MusicNote";

import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { styled } from "@material-ui/styles";

const MyPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  justifyContent: "center",
  alignContent: "center"
});

export class SongMenu extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  playSong = () => {
    this.myRef.current.play();
    // this.props.playSong();
  };
  render() {
    return (
      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={MyPaper}
          elevation={6}
          square
          className="sideBar"
        >
          <div>
            <Avatar id="songIcon">
              <MusicVideo />
            </Avatar>
            <Typography component="h1" variant="h5">
              Select your song
            </Typography>

            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar id="songIcon">
                    <MusicNote />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Radio Taiso" onClick={this.playSong} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar id="songIcon">
                    <MusicNote />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar id="songIcon">
                    <MusicNote />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" />
              </ListItem>
            </List>
          </div>
          <Audio ref={this.myRef} />
        </Grid>
        <div />
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    playSong: () => {
      dispatch({
        type: "PLAY_SONG"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongMenu);
