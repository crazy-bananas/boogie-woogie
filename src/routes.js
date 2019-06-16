import React from "react";
import { Route, BrowserRouter as Router} from "react-router-dom";
import App from "./App";

import history from './history';

export default () => { 
  return (
    <Router history={history}>
      <div>
      <Route exact path="/" render={(props) => <App {...props} />} />
      </div>
    </ Router>
  );
}
