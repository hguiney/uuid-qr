import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App/App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:uuid?" component={ App } />
    </Switch>
  </BrowserRouter>
);

export default Router;
