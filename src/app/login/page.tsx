"use client"

import styles from "./join.module.scss";
import Leftcontainer from "./left";
import Right from "./right";


function joinMain() {
  return (
    <div className={styles.container}>
        <Right/>
        <Leftcontainer/>
    </div>
  );
}

export default joinMain;
