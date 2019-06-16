import React from "react";
import { Route, Router} from "react-router-dom";
import App from "./App";
import AuthCallback from "./components/AuthCallback/AuthCallback"
import Auth from "./authentication/Auth"


import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export default () => { 
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home2" render={(props) => {
          handleAuthentication(props);
          return <AuthCallback {...props} /> 
        }}/>
      </div>
    </ Router>
  );
}
