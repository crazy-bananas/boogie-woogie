import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/logo.svg";
import Retry from "./Retry";
import "../styles/navbar.css";
import AppBars from "./AppBar";
import Home from "./Home.jsx";

const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #E91E63 20%, #9C27B0 50%, #673AB7 90%)"
});

class Navbar extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    this.setState({ authenticated: isAuthenticated() });
  }

  render() {
    return (
      <div id="navbar">
        <MyAppBar position="static" className="navbar">
          <Toolbar>
            <Grid alignItems="center" container>
              <Grid item>
                <img alt="logo" src={logo} style={{ height: 50, width: 50 }} />
              </Grid>
              <Grid item>
                <Home />
              </Grid>
              <Grid item style={{ position: "absolute", right: 100 }}>
                <Link to="/about">
                  <Button id="about_btn" style={{ color: "#fffff" }}>
                    About Us
                  </Button>
                </Link>
              </Grid>

              <Grid item style={{ position: "absolute", right: 10 }}>
                {!this.props.auth.isAuthenticated() && (
                  <Button
                    id="about_btn"
                    color="inherit"
                    onClick={this.props.auth.login}
                  >
                    Login
                  </Button>
                )}
                {this.props.auth.isAuthenticated() && (
                  <AppBars
                    auth={this.props.auth}
                    picture={localStorage.getItem("user-picture")}
                  />
                )}
              </Grid>

              <Grid item style={{ position: "absolute", right: 200 }}>
                {this.props.indexOfSelectedSong !== "" &&
                  this.props.moveSelected !== "" && <Retry />}
              </Grid>
            </Grid>
          </Toolbar>
        </MyAppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songList: state.songList,
    indexOfSelectedSong: state.songSelected,
    moveSelected: state.moveSelected,
    userPicture: state.user.pictureUrl
  };
};

export default connect(mapStateToProps)(Navbar);
