import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/loadingscore.css";

class LoadingScore extends Component {
  render() {
    return (
      <div className="loadingImg">
        <h1>Dance Finished!</h1>
        <h2 data-text="Calculating your score...">Calculating your score...</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScore);
