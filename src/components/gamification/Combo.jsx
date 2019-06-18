import React, { Component } from "react";
import { connect } from "react-redux";
import anime from "animejs";

class Combo extends Component {
  animateCombo = () => {
    anime
      .timeline({ loop: false })
      .add({
        targets: ".combo-game .circle-white",
        scale: [0, 3],
        opacity: [1, 0],
        easing: "easeInOutExpo",
        rotateZ: 360,
        duration: 1100
      })
      .add({
        targets: ".combo-game .circle-container",
        scale: [0, 1],
        duration: 1100,
        easing: "easeInOutExpo",
        offset: "-=1000"
      })
      .add({
        targets: ".combo-game .circle-dark",
        scale: [0, 1],
        duration: 1100,
        easing: "easeOutExpo",
        offset: "-=600"
      })
      .add({
        targets: ".combo-game .letters-left",
        scale: [0, 1],
        duration: 1200,
        offset: "-=550"
      })
      .add({
        targets: ".combo-game .bang",
        scale: [0, 1],
        rotateZ: [45, 15],
        duration: 1200,
        offset: "-=1000"
      })
      .add({
        targets: ".combo-game",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1400
      });

    anime({
      targets: ".combo-game .circle-dark-dashed",
      rotateZ: 360,
      duration: 8000,
      easing: "linear",
      loop: true
    });
  };

  render() {
    if (this.props.combo > 4) {
      console.log("animateCombo");
      this.animateCombo();
    }
    return (
      <div className="combo-game">
        <span className="letters-container">
          <span className="letters letters-left">Combo {this.props.combo}</span>
        </span>
        <span className="circle circle-white" />
        <span className="circle circle-dark" />
        <span className="circle circle-container">
          <span className="circle circle-dark-dashed" />
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    combo: state.combo
  };
};

export default connect(mapStateToProps)(Combo);
