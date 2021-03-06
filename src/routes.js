import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Play from "./components/Play";
import About from "./components/About";
import AuthCallback from "./components/AuthCallback/AuthCallback";
import Auth from "./authentication/Auth";
import Profile from "./components/Profile/Profile";
import Record from "./components/Record/Record";
import history from "./history";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export default () => {
  return (
    <Router history={history}>
      <div>
        <Route
          exact
          path="/"
          render={props => <App auth={auth} {...props} />}
        />
        <Route
          exact
          path="/profile"
          render={props => <Profile auth={auth} {...props} />}
        />
        <Route
          path="/login/"
          render={props => {
            handleAuthentication(props);
            return <AuthCallback {...props} />;
          }}
        />
        <Route
          exact
          path="/play"
          render={props => <Play auth={auth} {...props} />}
        />
        <Route
          exact
          path="/record"
          render={props => <Record auth={auth} {...props} />}
        />
        <Route
          exact
          path="/about"
          render={props => <About {...props} auth={auth} />}
        />
      </div>
    </Router>
  );
};
