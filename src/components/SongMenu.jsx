import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';

import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MusicNote from "@material-ui/icons/MusicNote";

import List from "@material-ui/core/List";
import { connect } from "react-redux";
import { styled } from "@material-ui/styles";
import dancingPeople from "../images/dancingPeople.jpg";
import RecordDanceModal from "./RecordDanceModal";
import "../styles/songmenu.css";
import SongLoading from "./SongLoading";

import axios from "axios";
import RecordButton from "./Buttons/recordbutton";

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
    this.loaded = false;
    this.songRef = React.createRef();
    this.state = {
      showModal: false,
      songList: [],
      open: false
    };
  }

  handleTooltipClose = () => {
    this.setState({open: false});
  }

  handleTooltipOpen = () => {
    this.setState({open: true});
  }

  playSong = event => {
    this.props.playSong(event);
  };

  switchModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount() {
    axios
      .get("https://boogie-banana.herokuapp.com/api/songs")
      .then(songs => {
        setTimeout(() => {
          this.setState({ loaded: true, songList: songs.data });
        }, 1000);
      })
      .catch(err => console.log(err));
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

            {this.state.loaded && (
              <List>
                {this.state.songList.map((song, index) => {
                  return (
                    <ListItem 
                      key={index}
                      button
                      onClick={() => this.playSong({ songCode: song.code })}
                    >
                      <ListItemAvatar>
                        <Avatar id="songIcon">
                          <MusicNote />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={song.title}
                      />
                    </ListItem>
                  );
                })}
              </List>
            )}
            {!this.state.loaded && <SongLoading />}

            <Typography component="h1" variant="h5">
              Record your dance
            </Typography>
            <RecordButton auth={this.props.auth} />
          </div>
        </Grid>
        <div />
        {this.state.showModal && <RecordDanceModal />}
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

const mapDispatchToProps = dispatch => {
  return {
    playSong: song => {
      dispatch({
        type: "SELECT_SONG",
        payload: song.songCode
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongMenu);
