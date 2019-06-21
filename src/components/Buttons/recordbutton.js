import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

class RecordButton extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated() && (
          <Button
            onClick={() => {
              this.props.switchModal();
            }}
            variant="contained"
            color="primary"
          >
            Record
          </Button>
        )}
        {!this.props.auth.isAuthenticated() && (
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Please log in to record new dance moves"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.auth.login}
            >
              Record
            </Button>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default RecordButton;
