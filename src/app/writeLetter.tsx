//writeLetter.tsx

"use client";
import { sendData } from "./api";
import styles from "./innerBox.module.scss";
import React, {useState } from "react";


function WriteLetter() {
  const [letter, setletter] = useState<string>("");
  const [title, settitle] = useState<string>("");

  const handleLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setletter(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settitle(event.target.value);
  };


  const onClick = async () => { //백엔드 통신
    try {
      const response = await sendData(letter);
      setletter(response.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className={styles.innerBox}>
      <h1 className={styles.time}>최종 수정일 2024-03-31 14:00</h1>
      <input
        className={styles.input}
        placeholder="문항이 무엇인가요?" onChange={handleTitleChange}></input>
      <input
        onChange={handleLetterChange}
        className={`${styles.input} ${styles.inputLetter}`}
        placeholder="자기소개서를 작성해보세요."></input>
      <div onClick={onClick}  className={styles.btn}>
        <h1>맞춤법 검사하기</h1>
      </div>
      <div onClick={onClick} className={styles.btn}>
        <h1>첨삭받기</h1>
      </div>
    </div>
  );
}

export default WriteLetter;
