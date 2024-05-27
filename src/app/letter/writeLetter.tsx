//writeLetter.tsx
"use client";
import { sendData } from "./api";
import styles from "./innerBox.module.scss";
import React, { useEffect, useState } from "react";
import { feedbackState, letterState, titleState } from "../store/atom";
import { useSetRecoilState } from "recoil";
import Loading from "./loading";
import LoadingModal from "./loading";
import saveLetter from "./save";

function WriteLetter() {
  const [letter, setletter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, settitle] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [inputBorder, setInputBorder] = useState<string>("");
  const [savetime, setSavetime] = useState<string>("");
  const loadLetterData = () => {
    const dataString = localStorage.getItem("myLetter");
    if (dataString) {
      const data = JSON.parse(dataString);
      setletter(data.letter);
      settitle(data.title);
      setSavetime(data.savetime);
    }
  };
  useEffect(() => {
    loadLetterData();
  }, []);
  const setAiFeedback = useSetRecoilState(feedbackState);
  const setLetterAtom = useSetRecoilState(letterState);
  const setTitleAtom = useSetRecoilState(titleState);

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
    setIsLoading(true); // 데이터 로딩 시작
    setAiFeedback("");
    try {
      const responseData = await sendData(letter, title);
      if (responseData) {
        setAiFeedback(responseData);
        setLetterAtom(letter);
        setTitleAtom(title);
        setIsLoading(false); // 데이터 로딩 완료
        console.log("자소서 응답", responseData);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  };
  const onSaveClick = () => {
    setSavetime(new Date().toLocaleString());
    const data = {
      letter,
      title,
      savetime,
    };
    localStorage.setItem("myLetter", JSON.stringify(data));
  };


  const onSaveDB = () => {

      const basicTitle = "기본 자기소개서"
      saveLetter( basicTitle,  title,  letter);  //feedback에서 오류
    }


  return (
    <div className={styles.innerBox}>
      <div className={styles.topcontainer}>
        <h1 className={styles.time}>최종 수정일: {savetime}</h1>
        <div className={styles.savebtn} onClick={onSaveClick}>
          <h1 onClick={onSaveDB }>임시저장</h1>
        </div>
      </div>
      <textarea
        className={styles.input}
        placeholder="문항이 무엇인가요?"
        value={title}
        onChange={handleTitleChange}></textarea>
      <textarea
        onChange={handleLetterChange}
        className={`${styles.input} ${styles.inputLetter} ${inputBorder && styles.errorBorder}`}
        placeholder="자기소개서를 작성해보세요."
        value={letter}></textarea>
      {warningMessage && (
        <div className={styles.warning}>{warningMessage}</div> //200글자 이상 작성해주세요.
      )}
      {isLoading ? (
        <LoadingModal isOpen={isLoading} /> // 로딩 컴포넌트 렌더링
      ) : (
        <>
          <div className={styles.btn}>
            <h1>맞춤법 검사하기</h1>
          </div>
          <div onClick={onClick} className={styles.btn}>
            <h1>첨삭받기</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default WriteLetter;
