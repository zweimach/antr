import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.runningText}>
        <p className={styles.footerText}>
          Selamat datang di KPP Pratama Bengkalis. Silahkan Menghubungi bagian
          Informasi apabila anda membutuhkan bantuan.
        </p>
      </div>
      <p className={styles.copyrightText}>&copy; KPP Pratama Bengkalis</p>
    </footer>
  );
}

export default Footer;
