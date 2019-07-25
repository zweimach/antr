import React from "react";

import styles from "./App.css";
import Layout from "../Layout";
import MenuCard from "./MenuCard";

function App() {
  const cards = [
    { id: 0, name: "NPWP" },
    { id: 1, name: "Faktur & Surat Lain" },
    { id: 2, name: "SPT" },
    { id: 3, name: "NPWP Usahawan" },
    { id: 4, name: "Informasi & Helpdesk" }
  ];

  return (
    <Layout>
      <main className={styles.appContent}>
        {cards.map(({ id, name }) => (
          <MenuCard key={id}>{name}</MenuCard>
        ))}
      </main>
    </Layout>
  );
}

export default App;
