import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import logo from "../images/logo.svg";
import axios from "axios";
import { Route, Link, Router } from "react-router-dom";
const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #E91E63 20%, #9C27B0 50%, #673AB7 90%)"
  //  backgroundColor: "#0a1747"
});
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
  }
  async getUserInfo() {
    return await axios.get("https://dev-boogie-woogie.auth0.com/userinfo", {
      headers: {
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    });
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    this.setState({ authenticated: isAuthenticated() });
  }

  render() {
    return (
      <div>
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
                {this.state.authenticated && (
                  <div>
                    <Button color="inherit" onClick={this.props.auth.logout}>
                      Logout
                    </Button>

                    <Button color="inherit">
                      <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "white" }}
                        component="button"
                      >
                        Profile
                      </Link>
                    </Button>
                  </div>
                )}
              </Grid>

              <Grid item>
                {this.props.auth.isAuthenticated() && (
                  <Button
                    color="inherit"
                    onClick={async () => {
                      const userInfo = await this.getUserInfo();
                      console.log(userInfo.data);
                    }}
                  >
                    Console Log User Info
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </MyAppBar>
      </div>
    );
    document.getElementById("root");
  }
}

const mapStateToProps = state => {
  return {
    songList: state.songList,
    indexOfSelectedSong: state.songSelected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => {
      dispatch({
        type: "RESET_STATE"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
