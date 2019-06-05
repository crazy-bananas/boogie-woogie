import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
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
      console.log(this.state.countdown);
      if (this.state.countdown === 0) {
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

export default connect(mapStateToProps)(Counter);
