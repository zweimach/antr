import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Dashboard, HelpCenter, NotFound, WaitList } from "./pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/helpcenter" element={<HelpCenter />}></Route>
        <Route path="/waitlist" element={<WaitList />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
