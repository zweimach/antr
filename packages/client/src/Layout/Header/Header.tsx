import React, { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import styles from "./Header.css";
import djpLogo from "../../assets/images/djpLogo.png";
import useInterval from "../../shared/hooks/useInterval";

function Header() {
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
    <header className={styles.appHeader}>
      <div className={styles.logoHolder}>
        <img className={styles.logo} src={djpLogo} alt="Logo DJP" />
      </div>

      <div className={styles.titleHolder}>
        <p className={styles.title}>Kantor Pelayanan Pajak Pratama Bengkalis</p>
        <p className={styles.subtitle}>
          Komplek Mall Mandau City Kav 109 Basement Blok B03
        </p>
      </div>

      <div className={styles.clockHolder}>
        <p className={styles.clock}>{time}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </header>
  );
}

export default Header;
