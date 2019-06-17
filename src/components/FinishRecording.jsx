import React, { Component } from "react";
import "../styles/scoreCard.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import axios from "axios";

class FinishRecording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
  }
  save = () => {
    axios
      .post("https://boogie-banana.herokuapp.com/api/moves", {
        songcode: this.props.newSong.code,
        moves: this.props.newSong.moves,
        name: `${this.props.newSong.title}+MOVE`
      })
      .then(data => {
        this.setState({
          saved: true
        });
      })
      .catch(err => {
        this.setState();
      });

    axios
      .post("https://boogie-banana.herokuapp.com/api/songs", {
        code: this.props.newSong.code,
        title: this.props.newSong.title,
        artist: this.props.newSong.artist
      })
      .then(data => console.log("song saved"));
  };
  render() {
    return (
      <div id="card">
        {!this.state.saved && (
          <div>
            <h1>Thank you for recording your moves. Do you want to save it?</h1>
            <Button
              onClick={() => {
                this.save();
              }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        )}
        {this.state.saved && (
          <div>
            <h1>
              Your moves are saved. Please go back to home page if you want to
              play against these moves!
            </h1>
            <Button
              onClick={() => {
                this.props.resetState();
              }}
              variant="contained"
              color="primary"
            >
              Home
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newSong: state.newSong
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => {
      dispatch({
        type: "RESET_STATE"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishRecording);
