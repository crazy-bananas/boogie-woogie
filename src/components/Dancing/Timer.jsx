import React, { Component } from "react";
import "../../styles/timer.css";
import { connect } from "react-redux";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: "00",
      seconds: "00",
      timeLeft: "",
      totalTime: this.props.time
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

  getTime = () => {
    let date = new Date(null);
    date.setSeconds(this.state.totalTime); // specify value for SECONDS here
    this.setState({ timeLeft: date.toISOString().substr(11, 8) });
    this.setState({ totalTime: this.state.totalTime - 1 });
  };

  timerSet = () => {
    return setInterval(this.getTime, 1000);
  };

  render() {
    return (
      <div id="timer">
        <label>{this.state.timeLeft}</label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    time: state.time
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
