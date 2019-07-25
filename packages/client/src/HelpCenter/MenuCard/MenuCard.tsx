import React from "react";

import styles from "./MenuCard.css";

function MenuCard({ children }: { children: string }) {
  return (
    <div className={styles.cardPlatform}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{children}</p>
      </div>
      <div className={styles.cardContent}></div>
    </div>
  );
}

export default MenuCard;
