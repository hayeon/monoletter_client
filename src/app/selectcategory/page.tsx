"use client";
import styles from "./selectcategory.module.scss";
import { useEffect, useState } from "react"; // useState 훅 임포트
import { useRouter } from "next/navigation";
import {  selectState } from "../store/atom";
import { useSetRecoilState } from "recoil";


function Selectcategory() {
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태 관리
  const router = useRouter();
  const categories = [
    "💻개발",
    "📄경영",
    "🍀마케팅",
    "🥤광고",
    "🎨디자인",
    "📈영업",
    "🙌🏻고객 서비스",
    "📱미디어",
    "💁🏻‍♀️인사",
    "🔧설계&엔지니어링",
    "💸금융",
    "⛓️제조&생산",
    "🧪바이오",
    "🥼의료",
  ];

  const handleSelectCategory = (category: string) => {
    if (selectedCategory === category) {
      //이미 선택한 걸 한 번 더 눌렀을 경우, 취소
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const onbackbtn = () => {
    window.history.back();
  };
  const onnextbtn = () => {
    if (selectedCategory) {
      // 선택된 카테고리가 있을 때만 다음 페이지로 이동
      router.push("/selectdetail");
    } else {
      return;
    }
  };

  const select = useSetRecoilState(selectState);
  useEffect(() => {
    select(selectedCategory);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.maintitle}>하연님은 어떤 분야를 준비중인가요?</h1>
      <h1 className={styles.subtitle}>
        1개의 지원 분야를 골라주세요. 선택한 직무는 마이페이지에서 변경할
        수 있어요.
      </h1>
      <div className={styles.selectcontainer}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${styles.categoryItem} ${selectedCategory === category ? styles.selected : ""}`}
            onClick={() => handleSelectCategory(category)}>
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
          className={`${styles.button} ${selectedCategory ? styles.active : styles.nextButtonDisabled}`}>
          다음
        </div>
      </div>
    </div>
  );
}

export default Selectcategory;
