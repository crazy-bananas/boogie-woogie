import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import SongMenu from "./components/SongMenu";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {!this.props.songSelected && <SongMenu />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songSelected: state.songSelected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
