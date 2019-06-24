import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/retry.css";
import HomeIcon from "@material-ui/icons/Home";
import CachedIcon from "@material-ui/icons/Cached";

const useStyles = makeStyles(theme => ({
  buttons: {},
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
          className={classes.buttons}
        >
          <CachedIcon style={{ color: "white" }} />
        </Button>
        <Button
          onClick={() => {
            home();
          }}
          className={classes.buttons}
        >
          <HomeIcon style={{ color: "white" }} />
        </Button>
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
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
