import React, { Component } from "react";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import "../styles/songmenu.css";

import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import About from "./About";

const images = [
  {
    url: "https://purbalite.net/wp-content/uploads/2018/10/dance.png",
    title: "Play",
    width: "50%",
    height: "50vh",
    link: "/play"
  },
  {
    url:
      "https://comps.canstockphoto.com/twisted-vinyl-disc-record-dance-party-clipart-vector_csp23964254.jpg",
    title: "Record",
    width: "50%",
    height: "50vh",
    link: "/record"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    position: "fixed",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "flex-end",
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.04
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`,
    fontSize: "40px"
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

export default function ButtonBases() {
  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
          // backgroundImage:
          //   "url(https://image.shutterstock.com/image-vector/detailed-vector-illustration-silhouettes-expressive-260nw-759480409.jpg)"
        }}
      >
        <Typography className={classes.title} variant="h5" component="h2">
          Boogie Woogie
        </Typography>
        <Typography color="textSecondary" gutterBottom className={classes.pos}>
          Boogie woogie is dancing app. If you want to dance click on dance. If
          you want to record your moves click on record
        </Typography>
      </div>
      <div className={classes.root}>
        {images.map(image => (
          <Link
            to={image.link}
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
              height: image.height
            }}
          >
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "100%",
                height: image.height
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Link>
        ))}
      </div>
    </div>
  );
}
