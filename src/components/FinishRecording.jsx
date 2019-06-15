import React, { Component } from "react";
import "../styles/scoreCard.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import axios from "axios";

class ScoreCard extends Component {
  save = () => {
    axios
      .post("https://boogie-banana.herokuapp.com/api/moves", {
        songcode: this.props.newSong.url,
        moves: this.props.newSong.moves,
        name: "test"
      })
      .then(data => console.log(this.props.newSong));

    axios.post("https://boogie-banana.herokuapp.com/api/songs", {
      code: this.props.newSong.url,
      title: this.props.newSong.title,
      artist: this.props.newSong.artist
    });
  };
  render() {
    return (
      <div id="card">
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
    );
  }
}

const mapStateToProps = state => {
  return {
    newSong: state.newSong
  };
};

export default connect(mapStateToProps)(ScoreCard);
