import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import logo from "../images/logo.svg";
import "../styles/navbar.css";
import AppBars from "./AppBar";
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
                <h1 style={{ fontFamily: "Gloria Hallelujah" }}>
                  Boogie Woogie
                </h1>
              </Grid>

              <Grid item style={{ position: "absolute", right: 10 }}>
                {!this.props.auth.isAuthenticated() && (
                  <Button color="inherit" onClick={this.props.auth.login}>
                    Login
                  </Button>
                )}
                {this.props.auth.isAuthenticated() && (
                  <AppBars
                    auth={this.props.auth}
                    picture={this.props.userAuthInfo.picture}
                  />
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </MyAppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userAuthInfo: state.userAuthInfo,
    songList: state.songList,
    indexOfSelectedSong: state.songSelected
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
