import React, { Component } from "react";
import "../styles/loadingscore.css";
import anime from "animejs";

export default class LoadingScore extends Component {
  componentDidMount() {
    anime
      .timeline({ loop: true })
      .add({
        targets: ".message .letter",
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 200,
        delay: function(el, i) {
          return 50 * i;
        }
      })
      .add({
        targets: ".message",
        opacity: 0,
        duration: 200,
        easing: "easeOutExpo",
        delay: 200
      });
  }

  render() {
    return (
      <div className="loadingScore">
        <h1 className="message">Dance Finished!</h1>
        <h2 className="message">
          <span className="letter">C</span>
          <span className="letter">a</span>
          <span className="letter">l</span>
          <span className="letter">c</span>
          <span className="letter">u</span>
          <span className="letter">l</span>
          <span className="letter">a</span>
          <span className="letter">t</span>
          <span className="letter">i</span>
          <span className="letter">n</span>
          <span className="letter">g&nbsp;</span>
          <span className="letter">y</span>
          <span className="letter">o</span>
          <span className="letter">u</span>
          <span className="letter">r&nbsp;</span>
          <span className="letter">s</span>
          <span className="letter">c</span>
          <span className="letter">o</span>
          <span className="letter">r</span>
          <span className="letter">e</span>
          <span className="letter">.</span>
          <span className="letter">.</span>
          <span className="letter">.</span>
        </h2>
      </div>
    );
  }
}
