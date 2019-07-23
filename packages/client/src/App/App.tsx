import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import styles from "./App.css";
import djpLogo from "../assets/images/djpLogo.png";

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }

    return () => {};
  }, [delay]);
}

function App() {
  const [time, setTime] = useState<string>(
    format(new Date(), "HH:mm:ss", { locale: id })
  );
  const [date, setDate] = useState<string>(
    format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })
  );

  useInterval(() => {
    setTime(format(new Date(), "HH:mm:ss", { locale: id }));
    setDate(format(new Date(), "EEEE, dd MMMM yyyy", { locale: id }));
  }, 1000);

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.logoHolder}>
          <img className={styles.logo} src={djpLogo} alt="Logo DJP" />
        </div>

        <div className={styles.titleHolder}>
          <p className={styles.title}>
            Kantor Pelayanan Pajak Pratama Bengkalis
          </p>
          <p className={styles.subtitle}>
            Komplek Mall Mandau City Kav 109 Basement Blok B03
          </p>
        </div>

        <div className={styles.clockHolder}>
          <p className={styles.clock}>{time}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </header>

      <div className={styles.container}>
        <main className={styles.appContent}>
          <MenuCard>NPWP</MenuCard>
          <MenuCard>Faktur &amp; Surat Lain</MenuCard>
          <MenuCard>SPT</MenuCard>
          <MenuCard>NPWP Usahawan</MenuCard>
          <MenuCard>Informasi &amp; Helpdesk</MenuCard>
        </main>

        <footer className={styles.appFooter}>
          <div className={styles.runningText}>
            <p className={styles.footerText}>
              Selamat datang di KPP Pratama Bengkalis. Silahkan Menghubungi
              bagian Informasi apabila anda membutuhkan bantuan.
            </p>
          </div>
          <p className={styles.copyrightText}>&copy; KPP Pratama Bengkalis</p>
        </footer>
      </div>
    </>
  );
}

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

export default App;
