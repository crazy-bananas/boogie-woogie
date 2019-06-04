import React, { Component } from "react";
import { connect } from "react-redux";
import navbar from "../styles/navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {/* After MVP 
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6">Boogie Woogie</Typography>
            {/* After MVP 
            <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
