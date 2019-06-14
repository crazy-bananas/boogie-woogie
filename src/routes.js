import React, { Component } from "react";
import SignUp from "./components/SignUp";
import App from "./App";
import { Route, Link, BrowserRouter as Router} from "react-router-dom";

export default () => { 
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/signup" component={SignUp} />
      </div>
    </ Router>
  );
}
