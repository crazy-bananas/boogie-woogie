import React, { Component } from "react";

import { styled } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const MyAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #087EE1 30%, #05E8BA 90%)"
});

const MyTypography = styled(Typography)({
  fontWeight: 400,
  fontSize: 40
});

export class Navbar extends Component {
  render() {
    return (
      <div>
        <MyAppBar position="static" className="navbar">
          <Toolbar>
            {/* After MVP 
            <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <MyTypography variant="h6" className="heading">
              Boogie Woogie
            </MyTypography>
            {/* After MVP 
            <Button color="inherit">Login</Button> */}
          </Toolbar>
        </MyAppBar>
      </div>
    );
  }
}
