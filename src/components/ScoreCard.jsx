import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Trophy from "../images/trophy.png";
import "../styles/scoreCard.css";
import { connect } from "react-redux";
import { styled } from "@material-ui/styles";

const MyCard = styled(Card)({
  maxWidth: 345
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
    if (this.props.username !== "") {
      axios.post("http://localhost:4000/api/scores", {
        songId: this.props.songSelected,
        moveId: this.props.moveSelected,
        user: this.props.username,
        score: this.props.score,
        pic: this.props.userpic
      });
    } else {
      axios.post("http://localhost:4000/api/scores", {
        songId: this.props.songSelected,
        moveId: this.props.moveSelected,
        user: "Anonymous",
        score: this.props.score,
        pic: "https://dummyimage.com/600x400/000/fff"
      });
    }
  }
  render() {
    return (
      <div id="card">
        <MyCard>
          <CardHeader title={this.props.title} />
          <div id="trophy">
            <MyMedia image={Trophy} title="Song Score" />
          </div>
          <CardContent>
            <MyTypography variant="body2" color="textSecondary" component="p">
              Your Score: {`${this.userScore}%`}
              {`(${this.props.score}/${this.props.maxScore})`}
            </MyTypography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
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
    userpic: state.userAuthInfo.picture
  };
};

export default connect(mapStateToProps)(ScoreCard);
