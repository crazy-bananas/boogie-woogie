import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import routing from "./routes";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>{routing()}</Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
