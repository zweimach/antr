import React from "react";
import { hot } from "react-hot-loader/root";
import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard, HelpCenter, WaitList, NotFound } from "./pages";
import { Layout } from "./components";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/helpcenter">
          <HelpCenter />
        </Route>
        <Route path="/waitlist">
          <WaitList />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect from="*" to="/404" />
      </Switch>
    </Layout>
  );
}

export default hot(App);
