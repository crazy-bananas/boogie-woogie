import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/retry.css";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function Retry(props) {
  function retry() {
    props.retryDance();
  }
  function home() {
    props.returnHome();
  }
  const classes = useStyles();
  return (
    <div id="scoreButtons">
      <div id="retry">
        <Button
          onClick={() => {
            retry();
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Retry
        </Button>
      </div>
      <div id="home">
        <Button
          onClick={() => {
            home();
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    retryDance: () => {
      dispatch({
        type: "RETRY_DANCE"
      });
    },
    returnHome: () => {
      dispatch({
        type: "RESET_STATE"
      });
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Retry);
