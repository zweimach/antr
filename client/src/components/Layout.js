import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import styles from "./Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  const location = useLocation();

  if (location.pathname.match(/^\/dashboard/)) {
    return children;
  }

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
