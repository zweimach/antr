import React from "react";

import styles from "./Dashboard.module.css";
import { ServiceCard } from "../components";

function Dashboard() {
  const serviceList = [
    { service: "A", id: "A", lastNumber: 0 },
    { service: "B", id: "B", lastNumber: 0 },
    { service: "C", id: "C", lastNumber: 0 },
    { service: "D", id: "D", lastNumber: 0 },
    { service: "E", id: "E", lastNumber: 0 },
    { service: "F", id: "F", lastNumber: 0 },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <p className={styles.title}>Dashboard</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button}>HelpCenter</button>
          <button className={styles.button}>WaitList</button>
          <button className={styles.button}>Home</button>
        </div>
      </header>
      <main className={styles.content}>
        <div className={styles.profile}>
          <p>Placeholder</p>
        </div>
        <div className={styles.waitList}>
          {serviceList.map(({ lastNumber, service, id }) => {
            return (
              <ServiceCard key={id} service={service}>
                {lastNumber.toString()}
              </ServiceCard>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
