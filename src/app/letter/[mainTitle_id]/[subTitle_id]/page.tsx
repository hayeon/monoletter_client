"use client";

import styles from "../../styles/Home.module.scss";
import WriteLetter from "../../writeLetter";
import Feedback from "../../feedback";
import SubLetterList from "../../subLetterList";
import { feedbackState, spellerAtom} from "@/app/store/atom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

export default function Letter() {
  const [feedback, setFeedback] = useRecoilState(feedbackState);
  const [feedbackCheck, setFeedbackCheck] = useState<boolean>(false);
  const [spllerAtom, setSplleratom] = useRecoilState(spellerAtom);
  useEffect(() => {
    if (feedback === "") {
      setFeedbackCheck(false);
    } else {
      setFeedbackCheck(true);
    }
  }, [feedback]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.innerBox}>
          <SubLetterList />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.innerBox}>
            <WriteLetter />
          </div>
        </div>
                {feedbackCheck ? (
          <div className={styles.rightBottom}>
            <div className={styles.innerBox}>
              <Feedback />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
