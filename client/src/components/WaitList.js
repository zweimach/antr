import React from "react";

import styles from "./WaitList.css";
import randomVideo from "../assets/videos/randomVideo.mp4";
import CounterCard from "./CounterCard";

function WaitList() {
  const counterList = [
    {
      id: 1,
      call: "A1",
    },
    {
      id: 2,
      call: "A5",
    },
    {
      id: 3,
      call: "B4",
    },
    {
      id: 4,
      call: "C7",
    },
    {
      id: 5,
      call: "D10",
    },
    {
      id: 6,
      call: "E1",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.counterCall}>
          <p className={styles.callText}>
            Antrian D10 Silahkan ke Counter 5 - Faishal
          </p>
        </div>
        <div className={styles.videoPlayer}>
          <video
            controls={false}
            muted={false}
            className={styles.video}
            autoPlay={true}
            loop={true}
          >
            <track default={true} kind="captions" srcLang="id" />
            <source src={randomVideo} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={styles.cardList}>
        {counterList.map(({ id, call }) => (
          <CounterCard counter={id} key={id}>
            {call}
          </CounterCard>
        ))}
      </div>
    </div>
  );
}

export default WaitList;
