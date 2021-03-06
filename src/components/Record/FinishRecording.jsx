import React, { Component } from "react";
import "../../styles/scoreCard.css";
import "../../styles/finishrecording.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import SaveMoves from "./SaveMoves";
import LoadingRecordResult from "../animation/LoadingRecordResult";

class FinishRecording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      showModal: false,
      loadingRecordResult: true,
      replayRecording: false
    };
  }

  componentDidMount() {
    this.startLoading();
  }

  startLoading = () => {
    let endTimeout = setTimeout(() => {
      this.setState({ loadingRecordResult: false });
      clearTimeout(endTimeout);
    }, 1800);
  };

  switchModal = () => {
    this.setState({ showModal: true });
  };

  saveSuccessful = () => {
    this.setState({ saved: true });
  };

  saveUnsuccessful = () => {
    this.setState({ error: true });
  };
  render() {
    return (
      <div>
        {this.state.loadingRecordResult && <LoadingRecordResult />}
        {!this.state.loadingRecordResult && (
          <div id="save-move">
            {!this.state.saved && (
              <div>
                <h1>
                  Thank you for recording your moves. Do you want to save it?
                </h1>
                <Button
                  onClick={this.switchModal}
                  variant="contained"
                  color="secondary"
                >
                  Save
                </Button>
              </div>
            )}
            {this.state.showModal && (
              <SaveMoves
                onsaveSuccessful={this.saveSuccessful}
                onsaveUnsuccessful={this.saveUnsuccessful}
              />
            )}
            {this.state.saved && (
              <div>
                <h1>
                  Your moves are saved. Please go back to the top page if you
                  want to play against these moves!
                </h1>
                <Button
                  onClick={() => {
                    this.props.resetState();
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Home
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newSong: state.newSong
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => {
      dispatch({
        type: "RESET_STATE"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishRecording);
