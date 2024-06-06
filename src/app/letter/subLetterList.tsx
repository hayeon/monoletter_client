import { useParams, useRouter } from "next/navigation";
import {
  addSubLetter,
  delSubLetter,
  loadAllLetter,
} from "../api/letter/router";
import React, { useEffect, useState } from "react";
import styles from "./styles/subLetterList.module.scss";
import { FaTrashCan } from "react-icons/fa6";

interface Letter {
  mainTitle: string;
  mainTitle_id: string;
  subTitles: SubTitle[];
}

interface SubTitle {
  feedback: string;
  letter: string;
  subTitle: string;
  subTitle_id: string;
}

function SubLetterList() {
  const params = useParams();
  const { mainTitle_id, subTitle_id } = params;
  const router = useRouter();
  const [mainTitle, setMainTitle] = useState<string>("");
  const [subTitles, setSubTitles] = useState<SubTitle[]>([]);
  const mainTitle_id_str = mainTitle_id.toString();

  const onAddSubTitle = async () => {
    try {
      const response = await addSubLetter(mainTitle_id_str);
      if (response) {
        router.push(
          `/letter/${response.data.mainTitle_id}/${response.data.subTitle_id}`
        );
      }
    } catch (error) {
      console.error("데이터를 불러오는 줄 에러가 발생하였습니다. ", error);
    }
  };

  const loadAllData = async () => {
    try {
      const response = await loadAllLetter(mainTitle_id_str);
      if (response) {
        const mainLetter = response.data.letters.find(
          (letter: Letter) => letter.mainTitle_id === mainTitle_id_str
        );
        if (mainLetter) {
          setMainTitle(mainLetter.mainTitle);
          setSubTitles(mainLetter.subTitles);
        } else {
          console.log("일치하는 mainTitle_id를 가진 letter가 없습니다.");
        }
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 에러가 발생하였습니다.", error);
    }
  };

  const onDelTitle = async () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      try {
        const response = await delSubLetter(
          mainTitle_id_str,
          subTitle_id.toString()
        );
        if (response.status === 200) {
          if (window.confirm("삭제되었습니다.")) {
            window.location.reload(); // 페이지를 새로 고침합니다.
          }
        }
      } catch (error) {
        console.error("데이터를 불러오는 줄 에러가 발생하였습니다. ", error);
      }
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // subTitle 클릭 핸들러
  const onSubTitleClick = (subTitle_id: string) => {
    router.push(`/letter/${mainTitle_id}/${subTitle_id}`); // subTitle_id를 사용하여 경로 이동
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>{mainTitle}</h1>
      <div className={styles.subTitleContainer}>
        {subTitles.map((subTitle) => (
          <React.Fragment key={subTitle.subTitle_id}>
            <div className={styles.subTitleWithIcon}>
              <h2
                className={styles.subTitle}
                onClick={() => onSubTitleClick(subTitle.subTitle_id)}>
                - {subTitle.subTitle}
              </h2>
              <FaTrashCan className={styles.trashIcon} onClick={onDelTitle} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={styles.addBtnContainer}>
        <h1 onClick={onAddSubTitle} className={styles.addBtn}>
          + 항목 추가하기
        </h1>
      </div>
    </div>
  );
}

export default SubLetterList;
