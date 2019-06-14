import React, { Component } from "react";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: "00",
      seconds: "00"
    };
    this.totalSeconds = 0;
    this.minutesLabel = this.minutesRef;
    this.secondsLabel = this.secondsRef;
    this.startTimer = 0;
  }

  componentDidMount() {
    this.startTimer = this.timerSet();
  }

  componentWillUnmount() {
    clearInterval(this.startTimer);
  }

  pad = val => {
    const valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  };

  timerSet = () => {
    return setInterval(this.setTime, 1000);
  };

  setTime = () => {
    ++this.totalSeconds;
    this.setState({
      seconds: this.pad(this.totalSeconds % 60),
      minutes: this.pad(parseInt(this.totalSeconds / 60))
    });
  };

  render() {
    return (
      <div>
        <label id="minutes">{this.state.minutes}</label>:
        <label id="seconds">{this.state.seconds}</label>
      </div>
    );
  }
}
