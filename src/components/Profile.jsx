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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.dummyFriendList = [];
    this.state = {
      data: 0
    };
  }
  isUserDataFetched = () => {
    if (this.props.userAuthInfo) {
      return (
        <div>
          <Fab size="medium" color="secondary" aria-label="Add" className="fab">
            <a href="/">
              <img src={backIcon} alt="back arrow icon" />
            </a>
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
          <p className="p"> Overall Score : {this.state.data.score} Points</p>
        </div>
      );
    }
    return <Loading />;
  };
  dummyFriendsCreator = () => {
    const friend = (
      <Card className="card">
        <CardContent className="cardBox">
          <Box className="friendBox">
            <Avatar alt="Friend Picture" src={bananaImage} className="avatar" />
          </Box>
          <p>Jhonny Banana</p>
        </CardContent>
      </Card>
    );
    for (let i = 0; i < 10; i++) {
      this.dummyFriendList.push(friend);
    }
    return this.dummyFriendList;
  };

  render() {
    return (
      <div>
        <Navbar auth={this.props.auth} />
        <Container className="wrapper">
          <Box flexDirection="col">{this.isUserDataFetched()}</Box>
          <Card className="myCard">
            <CardContent className="cardBox">
              
            </CardContent>
          </Card>
          <footer className="friends">
            <Card className="card">
              <CardContent>
                <Box display="flex" flexDirection="row">
                  {this.dummyFriendsCreator()}
                </Box>
              </CardContent>
            </Card>
          </footer>
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
