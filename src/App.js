import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";
import DanceWindow from "./components/DanceWindow";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {!this.props.isSongSelected ? <SongMenu /> : <DanceWindow />}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
