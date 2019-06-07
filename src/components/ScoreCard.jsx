import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Trophy from "../images/trophy.png";
import "../styles/scoreCard.css";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },

  avatar: {
    backgroundColor: red[500]
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 800,
    color: "orange"
  }
}));

function ScoreCard(props) {
  const classes = useStyles();

  return (
    <div id="card">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              BW
            </Avatar>
          }
          title={props.title}
          subheader={props.artist}
        />
        <div id="trophy">
          <CardMedia
            className={classes.media}
            image={Trophy}
            title="Song Score"
          />
        </div>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.scoreText}
          >
            Your Score: {props.score}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    title: state.songList[state.songSelected].title,
    artist: state.songList[state.songSelected].artist,
    score: state.totalScore
  };
};

export default connect(mapStateToProps)(ScoreCard);
