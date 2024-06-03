import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { feedbackState, letterState, titleState } from "../store/atom";
import styles from "./feedback.module.scss";

function Feedback() {
  const atomLetter = useRecoilValue(letterState);
  const atomFeeedback = useRecoilValue(feedbackState);
  const [feedback, setFeedback] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const letterSplit = atomLetter.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
    const feedbackSplit = atomFeeedback.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
    const maxLength = Math.max(letterSplit.length, feedbackSplit.length);
    const combined = [];
    for (let i = 0; i < maxLength; i++) {
      if (letterSplit[i]) combined.push(<span key={`letter-${i}`}>{letterSplit[i]}</span>);
      if (feedbackSplit[i]) combined.push(<span key={`feedback-${i}`} className={styles.feedbackStyle}>{feedbackSplit[i] + '\n\n'}</span>);
    }
    setFeedback(combined);
  }, [atomLetter, atomFeeedback]);


  return (
    <div className={styles.container}>
      {feedback.map((content, index) => (
        <React.Fragment key={index}>{content}<br/></React.Fragment>
      ))}
    </div>
  );
}
export default Feedback;
