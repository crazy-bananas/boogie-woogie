import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import red from "@material-ui/core/colors/red";
import "../styles/scoreCard.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

class ScoreCard extends Component {
  constructor(props) {
    super(props);
  }
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
          Retry
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.songList[state.songSelected].title,
    artist: state.songList[state.songSelected].artist,
    score: state.totalScore,
    maxScore: state.maxScore
  };
};

export default connect(mapStateToProps)(ScoreCard);
