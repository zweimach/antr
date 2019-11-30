import React from "react";
import { useRoute } from "react-router5";
import { hot } from "react-hot-loader/root";

import { Dashboard, HelpCenter, WaitList, NotFound } from "./pages";
import { Layout } from "./components";

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

export default hot(App);
