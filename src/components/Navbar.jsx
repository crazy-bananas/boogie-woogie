import React, { Component } from "react";

import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { connect } from "react-redux";
import logo from "../images/logo.svg";

const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #E91E63 20%, #9C27B0 50%, #673AB7 90%)"
  //  backgroundColor: "#0a1747"
});

export class Navbar extends Component {
  render() {
    return (
      <div>
        <MyAppBar position="static" className="navbar">
          <Toolbar onClick={this.props.resetState}>
            {/* After MVP 
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <img alt="logo" src={logo} style={{ height: 50, width: 50 }} />
            <h1 style={{ fontFamily: "Gloria Hallelujah" }}>Boogie Woogie</h1>
            {/* After MVP 
            <Button color="inherit">Login</Button> */}
          </Toolbar>
        </MyAppBar>
      </div>
    );
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
