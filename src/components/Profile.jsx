import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import bananaImage from "../images/bananaProfile.jpeg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../styles/profile.css";
import Loading from "./Loading";
import { connect } from "react-redux";
import backIcon from "../images/backArrow.png";
import Navbar from "./Navbar";
import axios from "axios";
import ProfileTable from "./ProfileTable";
import { Link } from "react-router-dom";
import { isArray } from "util";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.dummyFriendList = [];
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
            console.log(data);
          });
      } catch (error) {
        throw error;
      }
    }
  }
  getOverallScore = data => {
    let score = 0;
    if (data.length === 0) return score;

    for (let i = 0; i < data.length; i++) {
      score += data[i].score;
    }
    return Math.round(score / data.length);
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
            {this.props.userAuthInfonickname}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: {this.props.userAuthInfo.email}
          </Typography>
          <p className="p">
            {" "}
            Overall Score : {this.getOverallScore(this.state.data.data)} Points
          </p>
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
          <Box flexDirection="col">{this.isUserDataFetched()}</Box>
          <ProfileTable data={this.state.data} />
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
