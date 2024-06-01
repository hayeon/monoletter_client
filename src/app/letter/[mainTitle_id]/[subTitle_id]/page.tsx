"use client";

import styles from "../../Home.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MainTitleModal from "../../mainTitleModl";
import WriteLetter from "../../writeLetter";
import Feedback from "../../feedback";
import { useParams } from 'next/navigation';
import { loadLetter } from "@/app/api/letter/router";



export default function Letter() {
  const router = useRouter();
  const params = useParams();
  const {mainTitle_id, subTitle_id} = params;
  const email = "hayun4475@gmail.com"
  const loadData = async () => { //해당 사이트에 가입한 유저인지 확인
    try {
      const response = await loadLetter(mainTitle_id.toString(), subTitle_id.toString())
      console.log(response)
    } catch (error) {
      console.error("데이터를 불러오는 줄 에러가 발생하였습니다. ", error);

    }
  };



  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.innerBox}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.innerBox}>
            <WriteLetter />
          </div>
        </div>
        <div className={styles.rightBottom}>
          <div className={styles.innerBox}>
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}
