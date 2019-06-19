import React, { Component } from "react";
import "../../styles/loadingscore.css";
import anime from "animejs";

export default class LoadingRecordResult extends Component {
  componentDidMount() {
    anime
      .timeline({ loop: false })
      .add({
        targets: ".message-loading .letter",
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 250,
        delay: function(el, i) {
          return 50 * i;
        }
      })
      .add({
        targets: ".message-loading",
        opacity: 0,
        duration: 250,
        easing: "easeOutExpo",
        delay: 250
      });
  }

  render() {
    return (
      <div className="loadingScore">
        <h2 className="message-loading">
          <span className="letter">R</span>
          <span className="letter">e</span>
          <span className="letter">c</span>
          <span className="letter">o</span>
          <span className="letter">r</span>
          <span className="letter">d&nbsp;</span>
          <span className="letter">F</span>
          <span className="letter">i</span>
          <span className="letter">n</span>
          <span className="letter">i</span>
          <span className="letter">s</span>
          <span className="letter">h</span>
          <span className="letter">e</span>
          <span className="letter">d</span>
          <span className="letter">.</span>
        </h2>
      </div>
    );
  }
}
