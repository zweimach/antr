import React from "react";
import PropTypes from "prop-types";

import styles from "./MenuCard.css";

function MenuCard({ children, items }) {
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

MenuCard.propTypes = {
  children: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MenuCard;
