"use client";

import styles from "./Home.module.scss";
import WriteLetter from "./writeLetter";
import Feedback from "./feedback";
import { useState } from "react";

export default function Home() {
  const [mainTitle, setMaintitle] = useState("");
  // const dataString = localStorage.getItem("하연의 자기소개서");
  // if (dataString) {
  //   const data = JSON.parse(dataString);
  //   console.log(data);
  //   setMaintitle(data.mainTitle);
  // }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.innerBox}>{mainTitle}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.innerBox}>
            <WriteLetter />
          </div>
        </div>
        <div className={styles.rightBottom}>
          <div className={styles.innerBox}>
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}
