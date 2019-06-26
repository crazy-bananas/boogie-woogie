import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { styled } from "@material-ui/styles";
import dancingPeople from "../../images//WMpic/15809153.jpg";
import "../../styles/songmenu.css";
import SongLoading from "../SongLoading";
import SongsAndMoves from "./SelectSongsAndMoves";
import axios from "axios";

const MyPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  justifyContent: "center",
  alignContent: "center"
});

class SongMenu extends Component {
  constructor(props) {
    super(props);
    this.songRef = React.createRef();
    this.state = {
      showModal: false,
      songList: [],
      isLoading: true
    };
  }

  switchModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount() {
    axios
      .get("https://boogie-banana.herokuapp.com/api/songs")
      .then(songs => {
        setTimeout(() => {
          this.setState({ isLoading: false, songList: songs.data });
        }, 1000);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }

  render() {
    return (
      <Grid container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8}>
          <MyPaper>
            <img
              alt="People Dancing"
              src={dancingPeople}
              style={{ height: 600, width: 800 }}
            />
          </MyPaper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={MyPaper}
          elevation={6}
          square
        >
          <div>
            <Typography component="h1" variant="h5">
              Select your song
            </Typography>

            {this.state.isLoading ? (
              <SongLoading />
            ) : (
              <SongsAndMoves songList={this.state.songList} />
            )}
          </div>
        </Grid>
        <div />
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    songList: state.songList,
    indexOfSelectedSong: state.songSelected
  };
};

export default connect(mapStateToProps)(SongMenu);
