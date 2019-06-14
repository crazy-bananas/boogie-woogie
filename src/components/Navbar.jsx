import React, { Component } from "react";

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
  render() {
    return (
      <div >
        <MyAppBar position="static" className="navbar">
          <Toolbar>
            {/* After MVP 
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <img alt="logo" src={logo} style={{height:50,width:50}}/>
            <h1 style={{"font-family": 'Gloria Hallelujah'}}>Boogie Woogie</h1>
            {/* After MVP 
            <Button color="inherit">Login</Button> */}
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
