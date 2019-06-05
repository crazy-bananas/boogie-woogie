import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as One } from "../images/1.svg";
import { ReactComponent as Two } from "../images/2.svg";
import { ReactComponent as Three } from "../images/3.svg";
import "../styles/counter.css";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { countdown: 4 };
  }

  decrementCountdown = () => {
    this.setState({ countdown: this.state.countdown - 1 });
  };
  startCountdown = () => {
    let endTimeout = setInterval(() => {
      this.decrementCountdown();
      if (this.state.countdown === 0) {
        this.props.countdownFinished();
        clearInterval(endTimeout);
      }
    }, 2000);
  };

  render() {
    if (this.state.countdown === 4) {
      this.startCountdown();
    }
    return (
      <div>
        {this.state.countdown === 1 && <One className="counterImg" />}
        {this.state.countdown === 2 && <Two className="counterImg" />}
        {this.state.countdown === 3 && <Three className="counterImg" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSongSelected: state.isSongSelected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countdownFinished: () => {
      dispatch({
        type: "COUNTDOWN_FINISHED"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
