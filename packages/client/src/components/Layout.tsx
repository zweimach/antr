import React from "react";

import styles from "./Layout.css";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
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

export default Layout;
