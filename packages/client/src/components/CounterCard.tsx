import React from "react";

import styles from "./CounterCard.css";

interface Props {
  children: string;
  counter: number;
}

function CounterCard({ children, counter }: Props) {
  return (
    <div className={styles.cardPlatform}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{`Counter ${counter}`}</p>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardCaption}>{children}</p>
      </div>
    </div>
  );
}

export default CounterCard;
