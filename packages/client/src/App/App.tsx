import React from "react";
import { State } from "router5/types";
import { useRoute } from "react-router5";

import HelpCenter from "../HelpCenter";
import Layout from "../Layout";
import NotFound from "../NotFound";
import WaitList from "../WaitList";
import Dashboard from "../Dashboard";

function App() {
  const { route } = useRoute();

  return selectRoute(route);
}

function selectRoute(route: State) {
  let selected;

  switch (route.name) {
    case "Dashboard":
      selected = <Dashboard />;
      break;
    case "HelpCenter":
      selected = <HelpCenter />;
      break;
    case "WaitList":
      selected = <WaitList />;
      break;
    default:
      selected = <NotFound />;
  }

  if (route.name === "Dashboard") {
    return selected;
  }

  return <Layout>{selected}</Layout>;
}

export default App;
