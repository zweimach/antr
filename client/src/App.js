import React from "react";
import { useRoute } from "react-router5";

import {
  Layout,
  Dashboard,
  HelpCenter,
  WaitList,
  NotFound
} from "./components";

function App() {
  const { route } = useRoute();

  return selectRoute(route);
}

function selectRoute(route) {
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
