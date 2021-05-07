import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import CoreLayout from "./layouts/CoreLayout";
import SignUp from "./components/SignUp";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <CoreLayout />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default Routes;
