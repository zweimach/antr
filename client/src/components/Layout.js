import React from "react";
import PropTypes from "prop-types";

import styles from "./Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.layoutContainer}>
        <main className={styles.appContent}>{children}</main>
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
