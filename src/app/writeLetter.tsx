 //writeLetter.tsx
"use client";
import { sendData } from "./api";
import styles from "./innerBox.module.scss";
import React, { useState } from "react";
import { feedbackState, letterState } from "./store/atom";
import { useSetRecoilState } from "recoil";

function WriteLetter() {
  const [letter, setletter] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [inputBorder, setInputBorder] = useState<string>("");

  const setAiFeedback = useSetRecoilState(feedbackState);
  const setLetterAtom = useSetRecoilState(letterState);
  
  const handleLetterChange = (
    //자기소개서 작성함수
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setletter(event.target.value);
    if (warningMessage || inputBorder) {
      setWarningMessage("");
      setInputBorder("");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    settitle(event.target.value);
  };

  const onClick = async () => {
    if (letter.length < 200) {
      // 글자 수가 200자 미만
      setWarningMessage("200글자 이상 작성해주세요.");
      setInputBorder("2px solid red");
      return; //함수를 종료
    } else if (letter.length == 0) {
      setWarningMessage("자기소개서를작성해주세요.");
      setInputBorder("2px solid red");
    }
    try {
      const responseData = await sendData(letter, title);
      setAiFeedback(responseData);
      setLetterAtom(letter);
      console.log(responseData);
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
      <textarea
        className={styles.input}
        placeholder="문항이 무엇인가요?"
        onChange={handleTitleChange}></textarea>
      <textarea
        onChange={handleLetterChange}
        className={`${styles.input} ${styles.inputLetter} ${inputBorder && styles.errorBorder}`}
        placeholder="자기소개서를 작성해보세요.">
      </textarea>
      {warningMessage && (
          <div className={styles.warning}>{warningMessage}</div> //200글자 이상 작성해주세요.
        )}
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
