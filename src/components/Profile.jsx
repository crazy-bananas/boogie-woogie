import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import bananaImage from "../images/bananaProfile.jpeg";
import Card from "@material-ui/core/Card";
//import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "../styles/profile.css";
//import { textAlign } from "@material-ui/system";
import lifecycle from "react-pure-lifecycle";
import axios from "axios";
import Loading from "./Loading";
import { connect } from "react-redux";
import "../styles/profile.css";
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
  // getUserScore = () => {
  //   axios.get(``).then(data => {
  //     //this.setState({});
  //   });
  // };
  // getUserFriends = () => {
  //   axios.get(``).then(data => {
  //     //this.setState({});
  //   });
  // };
  componentDidMount() {
    //this.getUserScore();
    //this.getUserFriends();
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
            <Avatar alt="Remy Sharp" src={bananaImage} className="avatar" />
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
              <TextField
                id="filled-name"
                label="Song PLayed"
                className="textField"
                value="Different songs that the user has played"
              />
              <TextField
                id="filled-name"
                label="Rank"
                className="textField"
                value="Display ranking position"
                margin="normal"
              />
              <TextField
                id="filled-name"
                label="Other data"
                className="textField"
                value=".................................."
                margin="normal"
              />
              <TextField
                id="filled-name"
                label="Other data"
                className="textField"
                value=".................................."
                margin="normal"
              />
              <TextField
                id="filled-name"
                label="Other Data"
                className="textField"
                value=".................................."
                margin="normal"
              />
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
