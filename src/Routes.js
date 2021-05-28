import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import CoreLayout from "./layouts/CoreLayout";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import ArticleDisplay from "./components/ArticleDisplay";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";

function Routes() {
  return (
    <>
      <Header />
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
        <PrivateRoute path="/settings">
          <Settings />
        </PrivateRoute>
        <PrivateRoute exact path="/newpost">
          <NewPost />
        </PrivateRoute>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/articles/:slug">
          <ArticleDisplay />
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
