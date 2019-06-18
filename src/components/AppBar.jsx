import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div className={classes.root}>
      <div>
        <Avatar
          onClick={handleMenu}
          style={{
            textDecoration: "none",
            color: "white",
            marginLeft: 30
          }}
          alt="Profile Picture"
          src={props.picture}
        />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem>
            <Button>
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  marginLeft: 30
                }}
                component="button"
              >
                Profile
              </Link>
            </Button>
          </MenuItem>
          <MenuItem onClick={props.auth.logout}>
            <Button>
              <Link
                to="#"
                style={{
                  textDecoration: "none",
                  marginLeft: 30
                }}
                component="button"
              >
                Logout
              </Link>
            </Button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
