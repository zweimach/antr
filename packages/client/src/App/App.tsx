import React from "react";
import { State } from "router5/types";
import { useRoute } from "react-router5";

import HelpCenter from "../HelpCenter";
import Layout from "../Layout";
import NotFound from "../NotFound";

function App() {
  const { route } = useRoute();

  return <Layout>{selectRoute(route)}</Layout>;
}

function selectRoute(route: State) {
  switch (route.name) {
    case "HelpCenter":
      return <HelpCenter />;
    default:
      return <NotFound />;
  }
}

export default App;
