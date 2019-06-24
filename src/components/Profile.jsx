import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../styles/profile.css";
import Loading from "./Loading";
import { connect } from "react-redux";
import backIcon from "../images/backArrow.png";
import Navbar from "./Navbar";
import axios from "axios";
import ProfileTable from "./ProfileTable";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const CancelToken = axios.CancelToken;
const cancelAxios = CancelToken.source();

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersScores: []
    };
  }
  componentDidMount() {
    let user = localStorage.getItem("user-id");
    if (user) {
      axios
        .get(`https://boogie-banana.herokuapp.com/api/scores/${user}`, {
          cancelToken: cancelAxios.token
        })
        .then(data => {
          this.setState({ usersScores: data.data });
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log(
              "Axios request in Profile.jsx to score info was canceled.",
              err.message
            );
          } else {
            throw new Error(err.message);
          }
        });
    }
  }

  componentWillUnmount(){
    cancelAxios.cancel("Operation canceled by the user.");
  }

  getTotalScore = allScores => {
    let score = 0;
    if (allScores.length === 0) return score;

    for (let i = 0; i < allScores.length; i++) {
      score += allScores[i].score;
    }
    return score;
  };

  getAverageScore = allScores => {
    if (allScores.length === 0) return 0;
    let overAllScore = this.getTotalScore(allScores);
    return Math.round(overAllScore / allScores.length);
  };

  isUserDataFetched = () => {
    if (localStorage.getItem("user-id") && !!this.state.usersScores) {
      return (
        <div>
          <Fab size="medium" color="secondary" aria-label="Add" className="fab">
            <Link to="/">
              <img src={backIcon} alt="back arrow icon" />
            </Link>
          </Fab>
          <Avatar
            alt="Profile Picture"
            src={localStorage.getItem("user-picture")}
            className="bigAvatar"
          />
          <Typography variant="h6" gutterBottom>
            {localStorage.getItem("user-nickname")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <span className="userInfo">
              E-mail: {localStorage.getItem("user-email")}
            </span>
            <br />
            <span className="userInfo">
              Total Score : {this.getTotalScore(this.state.usersScores)} Points
            </span>
            <br />
            <span className="userInfo">
              Average Score :{" "}
              {this.getAverageScore(this.state.usersScores) + " Points"}
            </span>
          </Typography>
        </div>
      );
    }
    return <Loading />;
  };

  render() {
    return (
      <div id="background">
        <Navbar auth={this.props.auth} />
        <Container className="wrapper" justify="center">
          <Grid item xs={3}>
            <Box flexDirection="col">{this.isUserDataFetched()}</Box>
          </Grid>
          <Grid item xs={9}>
            <ProfileTable allScores={this.state.usersScores} />
          </Grid>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentScore: state.currentScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected
  };
};
export default connect(mapStateToProps)(Profile);
