import React from "react";

import styles from "./MenuCard.css";

interface Props {
  children: string;
  items: string[];
}

function MenuCard({ children, items }: Props) {
  return (
    <div className={styles.cardPlatform}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{children}</p>
      </div>
      <div className={styles.cardContent}>
        <ul className={styles.cardItems}>
          {items.map((item, index) => (
            <div key={index} className={styles.itemHolder}>
              <li key={index} className={styles.cardItem}>
                {item}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MenuCard;
