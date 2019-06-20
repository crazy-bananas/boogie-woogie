import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/retry.css";
import homeIcon from "../images/home2.png";
import retryDanceIcon from "../images/balckRetry.png";
const useStyles = makeStyles(theme => ({
  buttons:{
  },
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
          <img  style={{width:30,height:30}} src={retryDanceIcon} alt="retryIcon" title="retry this dance" />
        </Button>
        <Button
          onClick={() => {
            home();
          }}
          className={classes.buttons}
        >
          <img style={{width:30,height:30}} src={homeIcon} alt="home icon" title="return home"/>
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
