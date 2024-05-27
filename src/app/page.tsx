"use client"

import styles from "./home.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getGoogleData } from "./api/login/route";
import { checkcookie } from "./api/cookie/route";


interface Response {
  status: number;
  message: string;
}

interface check{
 res: boolean;

}

function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchGoogleData = async () => {
      const currentUrl = window.location.href;
      if (currentUrl.startsWith("http://localhost:3000/?code=")) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (code) {
          try {
            const response = (await getGoogleData(code)) as Response;
            if (response.message === "Registration complete.") {
              router.push("/selectcategory");
            } else if (
              response.message === "Please complete your profile details."
            ) {
              router.push("/selectcategory");
            } else {
              router.push("/letter");
            }
          } catch (error) {
            console.error(
              "홈 페이지에서 구글 유저 정보를 가져오는데 오류가 발생하였습니다. ",
              error
            );
          }
        }
      }
    };

    fetchGoogleData();
  }, [router]);

//쿠키가 있다면 letter 페이지로, 없다면 login 페이지로 이동
const onClick = async() => {
  const res =  await checkcookie();
  if (res === true) {
    router.push("/letter");
  } else {
    router.push("/login");
  }
}

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.maintitle}>취준생의 시작 자기소개서,</h1>
        <h1 className={styles.maintitle}>그 시작을 모노레터와 함께해보세요.</h1>
        <h1 className={styles.subtitle}>
          AI 직무역량 키워드 추천, AI 자기소개서 작성까지 취업 준비 과정의
          고민을 해결해드릴게요
        </h1>
  
          <h1 className={styles.button} onClick={onClick}> Monoletter 시작하기</h1>
      </div>

      {/* <Image
        src="/home/슬라이드2.PNG"
        alt="설명"
        width={100}
        height={100}
        layout="responsive"
      />
      <Image
        src="/home/슬라이드3.PNG"
        alt="설명"
        width={100}
        height={100}
        layout="responsive"
      />
      <Image
        src="/home/슬라이드4.PNG"
        alt="설명"
        width={100}
        height={100}
        layout="responsive"
      />
      <Image
        src="/home/슬라이드1.PNG"
        alt="설명"
        width={100}
        height={100}
        layout="responsive"
      /> */}
    </>
  );
}

export default Home;
