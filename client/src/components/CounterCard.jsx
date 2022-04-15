import PropTypes from "prop-types";
import React from "react";
import styles from "./CounterCard.module.css";

function CounterCard({ children, counter }) {
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

CounterCard.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
};

export default CounterCard;
