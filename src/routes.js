import React from "react";
import { Route, BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import SignUp from "./components/SignUp";

import Callback from './callback';
import Auth from './authentication/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}


export default () => { 
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
        <Route exact path="/home" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/callback" />
      </div>
    </ Router>
  );
}
