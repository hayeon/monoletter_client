//writeLetter.tsx
"use client";
import { sendData } from "./api";
import styles from "./styles/innerBox.module.scss";
import React, { useEffect, useState } from "react";
import { feedbackState, spellerAtom } from "@/app/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadingModal from "./loading";
import { loadLetter, saveLetter } from "../api/letter/router";
import { useParams, useRouter } from "next/navigation";
import { speller } from "../api/speller/route";
import SpellerPage from "./Spller";

function WriteLetter() {
  const [letter, setLetter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpellerModal, setSpellerModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [inputBorder, setInputBorder] = useState<string>("");
  const [savetime, setSavetime] = useState<string>("");
  const params = useParams();
  const { mainTitle_id, subTitle_id } = params;
  const [feedback, setFeedback] = useRecoilState(feedbackState);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [comparisonResults, setSpellerRes] = useRecoilState(spellerAtom);
  const spellerState = useRecoilValue(spellerAtom);

  const shouldRenderSpellerPage = spellerState.original !== '';

  const loadData = async () => {
    //데이터 불러오기
    try {
      const response = await loadLetter(
        mainTitle_id.toString(),
        subTitle_id.toString()
      );
      if (response) {
        setFeedback(response.data.feedback);
        console.log(feedback);
        setLetter(response.data.letter);
        setTitle(response.data.subTitle);
      }
    } catch (error) {
      console.error("데이터를 불러오는 줄 에러가 발생하였습니다. ", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSaveDB = async () => {
    //저장하기
    const response = await saveLetter(
      mainTitle_id.toString(),
      subTitle_id.toString(),
      title,
      letter,
      feedback.toString()
    );
    if (response === 200) {
      setSavetime(new Date().toLocaleString());
      setSaveModal(true);
      setTimeout(() => {
        setSaveModal(false);
      }, 3000); // 3초 뒤에 모달 닫기
    }
  };

  const handleLetterChange = (
    //자기소개서 작성함수
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLetter(event.target.value);
    if (warningMessage || inputBorder) {
      setWarningMessage("");
      setInputBorder("");
    }
  };

  // 공백을 제외한 글자 수 계산
  const countCharsWithoutSpaces = (letter: string): number => {
    return letter.replace(/\s+/g, "").length;
  };

  // 공백을 포함한 글자 수 계산
  const countCharsWithSpaces = (letter: string): number => {
    return letter.length;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const onClick = async () => {
    //피드백 받기
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
    try {
      const responseData = await sendData(letter, title);
      if (responseData) {
        setFeedback(responseData.toString());
        setLetter(letter);
        setTitle(title);
        onSaveDB();
        setIsLoading(false); // 데이터 로딩 완료
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
  const onSpllerClcik = async () => {
    if (countCharsWithoutSpaces(letter) > 500) {
      setWarningMessage("맞춤법 검사는 500글자 단위로만 가능해요");
      setInputBorder("2px solid red");
      return ;
    } else {
      const res = await speller(letter);
      setSpellerRes({
        original: res.original,
        checked: res.checked,
        errors: res.errors,
      });
      setSpellerModal(true);
    };
    }


  return (
    <div className={styles.innerBox}>
      {shouldRenderSpellerPage && 
        <div>
          <SpellerPage />
        </div>}
      {saveModal && (
        <div className={styles.saveModal}>
          <div>저장되었습니다!</div>
        </div>
      )}
      <div className={styles.topcontainer}>
        <h1 className={styles.time}>최종 수정일: {savetime}</h1>
        <div className={styles.savebtn} onClick={onSaveDB}>
          <h1>임시저장</h1>
        </div>
      </div>

      <textarea
        className={styles.input}
        placeholder="문항이 무엇인가요?"
        value={title}
        onChange={handleTitleChange}></textarea>
      <div className={styles.countChars}>
        <h1>공백 제외 글자수: {countCharsWithoutSpaces(letter)}</h1>
        <h1>공백 포함 글자수: {countCharsWithSpaces(letter)}</h1>
      </div>

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
        <div className={styles.btnContainer}>
          <div className={styles.btn} onClick={onSpllerClcik}>
            <h1>맞춤법 검사하기</h1>
          </div>
          <div onClick={onClick} className={styles.btn}>
            <h1>첨삭받기</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteLetter;
