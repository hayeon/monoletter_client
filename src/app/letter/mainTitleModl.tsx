import React, { useState } from "react";
import styles from "./styles/mainTitleModal.module.scss";
import {addLetter } from "../api/letter/router";
import { useRouter } from "next/navigation";

interface MainTitleModalProps {
  isOpen: boolean;
}

function MainTitleModal({ isOpen }: MainTitleModalProps) {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();


  if (!isOpen) return null;


  const onClick= async () => {
    const res = await addLetter(title)
    console.log(res.data.mainTitle_id);
    router.push(`/letter/${res.data.mainTitle_id}/${res.data.subTitle_id}`)
    
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.titlecontainer}>
        <h1 className={styles.title}>
          작성할 자기소개서 메인 제목을 작성해주세요.
        </h1>
        <input
          className={styles.inputTitle}
          placeholder="삼성전자 하반기 공채 자기소개서"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ></input>
        <button className={styles.okBtn} onClick={onClick}>확인</button>
      </div>
    </div>
  );
}
export default MainTitleModal;
