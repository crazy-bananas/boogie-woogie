import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Trophy from "../images/trophy.png";
import "../styles/scoreCard.css";
import { connect } from "react-redux";
import { styled } from "@material-ui/styles";

const MyCard = styled(Card)({
  width: 350,
  height: 500
});

const MyMedia = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%"
});

const MyTypography = styled(Typography)({
  fontSize: 30,
  fontWeight: 800,
  color: "orange"
});

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.userScore = Math.floor((this.props.score / this.props.maxScore) * 100);
  }

  componentDidMount() {
    if (this.props.username !== undefined) {
      axios.post("https://boogie-banana.herokuapp.com/api/scores", {
        songId: this.props.songSelected,
        moveId: this.props.moveSelected,
        user: this.props.username,
        score: this.props.score,
        pic: this.props.userpic,
        userId: this.props.userId
      });
    } else {
      axios.post("https://boogie-banana.herokuapp.com/api/scores", {
        songId: this.props.songSelected,
        moveId: this.props.moveSelected,
        user: "Anonymous",
        score: this.props.score,
        pic: "https://dummyimage.com/600x400/000/fff",
        userId: "default"
      });
    }
  }
  render() {
    return (
      <div id="card">
        <MyCard>
          <div id="trophy">
            <MyMedia
              image={Trophy}
              style={{ height: 150 }}
              title="Song Score"
            />
          </div>
          <CardContent>
            <MyTypography variant="body2" color="textSecondary" component="p">
              Your Score: {`${this.userScore}%`}
              <br />
              {`(${this.props.score}/${this.props.maxScore})`}
            </MyTypography>
          </CardContent>
        </MyCard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.totalScore,
    maxScore: state.maxScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected,
    username: state.userAuthInfo.nickname,
    userpic: state.userAuthInfo.picture,
    userId: state.userAuthInfo.sub
  };
};

export default connect(mapStateToProps)(ScoreCard);
