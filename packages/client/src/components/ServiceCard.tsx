import React from "react";

import styles from "./ServiceCard.css";

interface Props {
  children: string;
  service: string;
}

function ServiceCard({ children, service }: Props) {
  return (
    <div className={styles.cardPlatform}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{`Antrian ${service}`}</p>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardCaption}>{children}</p>
        <button className={styles.callButton}>Call This Number</button>
      </div>
    </div>
  );
}

export default ServiceCard;
