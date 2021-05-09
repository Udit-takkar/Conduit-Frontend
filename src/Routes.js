import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import CoreLayout from "./layouts/CoreLayout";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import ArticleDisplay from "./components/ArticleDisplay";

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
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route exact path="/newpost">
        <NewPost />
      </Route>
      <Route exact path="/me">
        <Profile />
      </Route>
      <Route path="/articles/:slug">
        <ArticleDisplay />
      </Route>
    </Switch>
  );
}

export default Routes;
