import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import logo from "../images/logo.svg"

const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #ffc414 20%, #fa7f2d 50%, #ffc414 90%)"
  //  backgroundColor: "#0a1747"
});

export class Navbar extends Component {
  render() {
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
              </Grid>

              <Grid item>
                <Button color="inherit" onClick={this.login.bind(this)} >Login</Button>
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
