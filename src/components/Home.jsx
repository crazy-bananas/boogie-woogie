import React from "react";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/styles";
import { connect } from "react-redux";

const HomeButton = styled(Button)({
  fontFamily: "Gloria Hallelujah",
  fontSize: "25px",
  color: "#FFF",
  fontWeight: "1000"
});

class Home extends React.Component {
  returnHome = () => {
    this.props.returnHome();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <HomeButton
          onClick={() => {
            this.returnHome();
          }}
        >
          Boogie Woogie
        </HomeButton>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    returnHome: () => {
      dispatch({
        type: "RESET_STATE"
      });
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Home)
);
