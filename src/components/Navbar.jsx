import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import logo from "../images/logo.svg"

const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #ffc414 20%, #fa7f2d 50%, #ffc414 90%)"
  //  backgroundColor: "#0a1747"
});

const MyTypography = styled(Typography)({
  fontWeight: 400,
  fontSize: 40
});

export class Navbar extends Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div >
        <MyAppBar position="static" className="navbar">
          <Toolbar>
            <Grid justify="space-between" alignItems="center" container>
              <Grid item>
                {/* After MVP 
                <IconButton edge="start" color="inherit" aria-label="Menu">
                <MenuIcon />
                </IconButton> */}
                <h1 style={{"fontFamily": 'Gloria Hallelujah'}}>Boogie Woogie</h1>
              </Grid>
              <Grid item>
                <img alt="logo" src={logo} style={{height:50,width:50}}/>
                {/* <MyTypography
                  variant="h6"
                  className="heading"
                  onClick={this.props.resetState}
                  >
                  Boogie Woogie
                </MyTypography> */}
              </Grid>
              <Grid item>
                {console.log(isAuthenticated())}
                {!isAuthenticated() && <Button color="inherit" onClick={this.login.bind(this)} >Login</Button>}
                {isAuthenticated() && <Button color="inherit" onClick={this.logout.bind(this)} >Logout</Button>}
              </Grid>
            </Grid>
          </Toolbar>
        </MyAppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songList: state.songList,
    indexOfSelectedSong: state.songSelected
  };
};

const mapDispatchToProps = (dispatch) => {
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
