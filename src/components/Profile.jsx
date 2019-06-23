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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0
    };
  }
  componentDidMount() {
    let user = localStorage.getItem("user-id");
    if (user) {
      axios
        .get(`https://boogie-banana.herokuapp.com/api/scores/${user}`)
        .then(data => {
          this.setState({ data: data });
        })
        .catch(error => {
          throw new Error(`Getting user info: ${error.message}`);
        });
    }
  }
  getTotalScore = data => {
    let score = 0;
    if (data.length === 0) return score;

    for (let i = 0; i < data.length; i++) {
      score += data[i].score;
    }
    return score;
  };

  getAverageScore = data => {
    if (data.length === 0) return 0;
    let overAllScore = this.getTotalScore(data);
    return Math.round(overAllScore / data.length);
  };

  isUserDataFetched = () => {
    if (localStorage.getItem("user-id") && this.state.data !== 0) {
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
            Email: {localStorage.getItem("user-email")}
            <p className="p">
              {" "}
              Total Score : {this.getTotalScore(this.state.data.data)} Points
            </p>
            <p className="p">
              {" "}
              Average Score : {this.getAverageScore(this.state.data.data)}{" "}
              Points
            </p>
          </Typography>
        </div>
      );
    }
    return <Loading />;
  };

  render() {
    return (
      <div>
        <Navbar auth={this.props.auth} />
        <Container className="wrapper" justify="center">
          <Grid item xs={3}>
            <Box flexDirection="col">{this.isUserDataFetched()}</Box>
          </Grid>
          <Grid item xs={9}>
            <ProfileTable data={this.state.data} />
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
    moveSelected: state.moveSelected,
  };
};
export default connect(mapStateToProps)(Profile);
