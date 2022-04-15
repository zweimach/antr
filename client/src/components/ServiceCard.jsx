import React from "react";
import PropTypes from "prop-types";

import styles from "./ServiceCard.module.css";

function ServiceCard({ children, service }) {
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

ServiceCard.propTypes = {
  children: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
};

export default ServiceCard;
