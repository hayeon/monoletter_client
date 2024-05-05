import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { feedbackState, letterState } from "../store/atom";
import styles from "./feedback.module.scss";

function Feedback() {
  const atomLetter = useRecoilValue(letterState);
  const atomFeeedback = useRecoilValue(feedbackState);
  const [feedback, setFeedback] = useState<JSX.Element[]>([]);


  useEffect(() => {
    const letterSplit = atomLetter.split("\n").filter((paragraph) => paragraph.trim() !== "");
    const feedbackSplit = atomFeeedback.split("\n").filter((paragraph) => paragraph.trim() !== "");
    const maxLength = Math.max(letterSplit.length, feedbackSplit.length);
    const combined = [];
    for (let i = 0; i < maxLength; i++) {
      if (letterSplit[i]) combined.push(<span key={`letter-${i}`}>{letterSplit[i]}</span>);
      if (feedbackSplit[i]) combined.push(<span key={`feedback-${i}`} className={styles.feedbackStyle}>{'  => ' + feedbackSplit[i] + '\n\n'}</span>);
    }
    setFeedback(combined);
  }, [atomLetter, atomFeeedback]);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>당신의 자기소개서는 경험과 열정을 잘 나타내고 있으나, Android 개발자 직무를 지원하기에는 기술적 경험과 직무 관련 내용을 보다 구체적으로 언급하고 강조할 필요가 있습니다.</h1>
      {feedback.map((content, index) => (
        <React.Fragment key={index}>{content}<br/></React.Fragment>
      ))}
    </div>
  );
}
export default Feedback;
