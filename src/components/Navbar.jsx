import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Auth from '../authication/Auth';

const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #ffc414 20%, #fa7f2d 50%, #ffc414 90%)"
  //  backgroundColor: "#0a1747"
});

const MyTypography = styled(Typography)({
  fontWeight: 400,
  fontSize: 40
});

const auth = new Auth();

export class Navbar extends Component {
  auth = new Auth();

  render() {
    return (
      <div>
        <MyAppBar position="static" className="navbar">
          <Toolbar>
            <Grid justify="space-between" alignItems="center" container>
              <Grid item>
                {/* After MVP 
                <IconButton edge="start" color="inherit" aria-label="Menu">
                <MenuIcon />
                </IconButton> */}
                <MyTypography
                  variant="h6"
                  className="heading"
                  onClick={this.props.resetState}
                  >
                  Boogie Woogie
                </MyTypography>
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={() => {
                  console.log("Login");
                  auth.login();}} >Login</Button>
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
