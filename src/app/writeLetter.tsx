import styles from "./innerBox.module.scss";
import React from "react";

function WriteLetter() {
  return (
    <div className={styles.innerBox}>
      <h1 className={styles.time}>최종 수정일 2024-03-31 14:00</h1>
      <textarea
        className={styles.input}
        placeholder="문항이 무엇인가요?"></textarea>
      <textarea
        className={`${styles.input} ${styles.inputLetter}`}
        placeholder="자기소개서를 작성해보세요."></textarea>
      <div className={styles.btn}>
        <h1>맞춤법 검사하기</h1>
      </div>
      <div className={styles.btn}>
        <h1>첨삭받기</h1>
      </div>
    </div>
  );
}

export default WriteLetter;
