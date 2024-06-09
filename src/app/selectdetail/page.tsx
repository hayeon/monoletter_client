"use client";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { detailState, selectState } from "../store/atom";
import styles from "./styles/selectDetail.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUser, sendDetail } from "../api/selectdetail/route";

function SelectDetail() {
  const [selectDetails, setSelectDetails] = useState<string[]>([]);
  const [selectOne, setSelectOne] = useState<string>("");
  const atomSelect = useRecoilValue(selectState);
  const atomdetail = useSetRecoilState(detailState);
  const router = useRouter();

  const devDetail = [
    "💻백엔드",
    "🖥️프론트",
    "📱IOS",
    "🤖안드로이드",
    "🔧시스템",
    "🌐네트워크",
    "📂DBA",
    "📊데이터",
    "🧠머신러닝",
    "🎮게임",
    "🔒보안",
  ];

  const mgmtDetails = [
    "📈경영기획",
    "🌐웹기획",
    "👥PL",
    "📊PM",
    "💡PO",
    "💼금융 컨설턴트",
  ];

  const marketingDetails = [
    "🌟 브랜드마케터",
    "📈 퍼포먼스 마케터",
    "💖 CRM마케터",
    "🌐 온라인마케터",
    "✍️ 콘텐츠마케터",
    "🎨 크리에이티브디렉터",
    "🛍️ MD",
  ];

  const designDetails = [
    "🖼️ 그래픽 디자이너",
    "🕹️ 3D 디자이너",
    "📦 제품디자이너",
    "🏭 산업 디자이너",
    "🎨 광고디자이너",
    "👁️ 시각 디자이너",
    "🎞️ 영상 디자이너",
    "🌐 웹 디자이너",
    "🖌️ UI&UX 디자이너",
    "👗 패션디자이너",
    "🏡 실내디자이너",
    "🎭 캐릭터디자이너",
    "🎨 아트디렉터",
    "✏️ 일러스트레이터",
  ];

  useEffect(() => {
    switch (atomSelect) {
      case "💻개발":
        setSelectDetails(devDetail);
        break;
      case "📄경영":
        setSelectDetails(mgmtDetails);
        break;
      case "🍀마케팅":
        setSelectDetails(marketingDetails);
        break;
      case "🎨디자인":
        setSelectDetails(designDetails);
        break;
    }
  }, []);

  // useEffect(()=> { //로그인 검증
  //   const mail = 'hayun4475@gmail.com'
  //   const res = checkUser(mail);
  // })


  const handleSelectDetail = (detail: string) => {
    if (selectOne === detail) {
      //이미 선택한 걸 한 번 더 눌렀을 경우, 취소
      setSelectOne("");
    } else {
      setSelectOne(detail);
      atomdetail(detail);
    }
  };

  const onbackbtn = () => {
    window.history.back();
  };
  const onnextbtn = async () => {
    try {
      const response = await sendDetail(selectOne);
      if (response === 200) {
        // 응답이 성공적이면, letter 페이지로 이동
        router.push("/letter"); // '/letter'는 목적지 페이지의 경로
      }
    } catch (error) {
      console.log("백엔드와 디테일 통신 중, 오류가 발생하였습니다.", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.maintitle}>구체적인 분야를 선택해주세요.</h1>
      <h1 className={styles.subtitle}>
        1개의 지원 직무 분야를 골라주세요. 선택한 직무는 마이페이지에서 변경할
        수 있어요.
      </h1>
      <div className={styles.selectcontainer}>
        {selectDetails.map((category, index) => (
          <div
            key={index}
            className={`${styles.categoryItem} ${selectOne === category ? styles.selected : ""}`}
            onClick={() => handleSelectDetail(category)}>
            {category}
          </div>
        ))}
      </div>
      <div className={styles.btncontainer}>
        <div className={styles.button} onClick={onbackbtn}>
          이전
        </div>
        <div
          onClick={onnextbtn}
          className={`${styles.button} ${selectOne ? styles.active : styles.nextButtonDisabled}`}>
          다음
        </div>
      </div>
    </div>
  );
}

export default SelectDetail;
