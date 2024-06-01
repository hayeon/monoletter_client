"use client";

import styles from "./Home.module.scss";
import WriteLetter from "./writeLetter";
import Feedback from "./feedback";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MainTitleModal from "./mainTitleModl";

export default function Letter() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = "hayun4475@gmail.com"
  const mainTitleModal = () => {
    setIsModalOpen(true);
  };

  const letterCheck = async (email: string) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/lettercheck`, {email: email}); //작성한 자소서가 있는지 확인
      if (response.data === false) { //없다면, 메인 제목 모달을 띄움
        console.log(response.data);
        mainTitleModal();
      } else  { 
        router.push(`/letter/${response.data.mainTitle_id}/${response.data.subTitle_id}`)
         
      }
    } catch (error) {
      console.error("Error checking letter:", error);

    }
  };

  useEffect(() => {
    letterCheck(email);
  }, []);


  return (
    <div className={styles.container}>
    {isModalOpen ? (<MainTitleModal isOpen={isModalOpen} />) : null}

    </div>
  );
}
