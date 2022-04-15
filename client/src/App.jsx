import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./components";
import { Dashboard, HelpCenter, NotFound, WaitList } from "./pages";

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

export default App;
