import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import "../styles/about.css";
import Grid from "@material-ui/core/Grid";
import dance from "../images/about/demo_play.png";

export function About(props) {
  return (
    <div className="App" id="about">
      <Navbar auth={props.auth} />
      <h1 className="headline">
        Boogie Woogie is <br />
        Motion Tracking application
        <br /> that scores your dance moves.
      </h1>
      <hr />
      <h2 className="second-line">You can practice dance</h2>
      <Grid container justify="center">
        <ol>
          <li>without any instructors</li>
          <li>while staying at home</li>
          <li>whenever you want</li>
          <li>for free</li>
        </ol>
      </Grid>
      <div className="section">
        <span>How To Use It</span>
      </div>
      <h3 className="sub-title">1. Dance</h3>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <ol className="list-half">
            <li>Pick a song</li>
            <li>Match your position</li>
            <li>Dance to moves</li>
          </ol>
        </Grid>
        <Grid item xs={4}>
          <img src={dance} alt="play_demo" className="demo-image" />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={12}>
          <p>
            Moves will be displayed.
            <br />
            Your moves are tracked through webcam
          </p>
        </Grid>
      </Grid>
      <h3 className="sub-title">2. Record</h3>
      <Grid container>
        <Grid item xs={4} />
        <Grid item xs={4} className="list-half">
          <ol>
            <li>Pick a song from YouTube</li>
            <li>Match your position</li>
            <li>Dance while music is on</li>
            <li>Save your move</li>
          </ol>
        </Grid>
        <Grid item xs={4} />
      </Grid>
      <div className="section">
        <span>What you need</span>
      </div>
      <ol className="list-what-you-need">
        <li>PC & Webcam</li>
        <li>
          No need to: Download application, get console and tracking equipment!
        </li>
      </ol>
      <div className="section">
        <span>Who we are</span>
      </div>
      <ul>
        <li>
          Florin{" "}
          <a href="https://github.com/Mavroian" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          Johannes{" "}
          <a href="https://github.com/johachi" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          Shruti{" "}
          <a href="https://github.com/Sjain020188" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          Yasu{" "}
          <a href="https://github.com/yasmiyazaki" target="_blank">
            GitHub
          </a>
        </li>
      </ul>
      <div className="section">
        <span>GitHub</span>
        <div>
          <a
            href="https://github.com/crazy-bananas/boogie-woogie"
            target="_blank"
          >
            https://github.com/crazy-bananas/boogie-woogie
          </a>
        </div>
      </div>
      Thank you for visiting!
      <div className="padding-bottom" />
    </div>
  );
}

export default connect(
  null,
  null
)(About);
