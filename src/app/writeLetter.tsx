//writeLetter.tsx

"use client";
import { sendData } from "./api";
import styles from "./innerBox.module.scss";
import React, { useState } from "react";
import { letterState } from "./store/letterState";
import { useSetRecoilState } from "recoil";

function WriteLetter() {
  const [letter, setletter] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const setAiFeedback = useSetRecoilState(letterState);

  
  const handleLetterChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setletter(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    settitle(event.target.value);
  };

  const onClick = async () => {
    // 백엔드 통신
    try {
      // sendData 함수의 반환값을 SendDataResponse 타입으로 받습니다.
      const responseData = await sendData(letter, title);
      // responseData 객체의 feedback 속성을 setFeedback 함수에 전달합니다.
      setFeedback(responseData);
      setAiFeedback(responseData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.innerBox}>
      <h1 className={styles.time}>최종 수정일 2024-03-31 14:00</h1>
      <h1>{feedback}</h1>
      <textarea
        className={styles.input}
        placeholder="문항이 무엇인가요?"
        onChange={handleTitleChange}></textarea>
      <textarea
        onChange={handleLetterChange}
        className={`${styles.input} ${styles.inputLetter}`}
        placeholder="자기소개서를 작성해보세요."></textarea>
      <div className={styles.btn}>
        <h1>맞춤법 검사하기</h1>
      </div>
      <div onClick={onClick} className={styles.btn}>
        <h1>첨삭받기</h1>
      </div>
    </div>
  );
}

export default WriteLetter;
