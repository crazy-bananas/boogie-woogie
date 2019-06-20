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
    if (this.props.userAuthInfo) {
      try {
        axios
          .get(
            `https://boogie-banana.herokuapp.com/api/scores/${
              this.props.userAuthInfo.sub
            }`
          )
          .then(data => {
            this.setState({ data: data });
          });
      } catch (error) {
        throw error;
      }
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
    if (this.props.userAuthInfo && this.state.data !== 0) {
      return (
        <div>
          <Fab size="medium" color="secondary" aria-label="Add" className="fab">
            <Link to="/">
              <img src={backIcon} alt="back arrow icon" />
            </Link>
          </Fab>
          <Avatar
            alt="Profile Picture"
            src={this.props.userAuthInfo.picture}
            className="bigAvatar"
          />
          <Typography variant="h6" gutterBottom>
            {console.log(this.props.userAuthInfonickname)}
            {this.props.userAuthInfonickname}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: {this.props.userAuthInfo.email}
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
        <Container className="wrapper">
          <Grid item xs={3} justify="center">
            <Box flexDirection="col">{this.isUserDataFetched()}</Box>
          </Grid>
          <Grid item xs={9} justify="center">
            <ProfileTable data={this.state.data} />
          </Grid>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userAuthInfo: state.userAuthInfo,
    currentScore: state.currentScore,
    songSelected: state.songSelected,
    moveSelected: state.moveSelected
  };
};
export default connect(mapStateToProps)(Profile);
