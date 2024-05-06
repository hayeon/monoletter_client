// page.tsx 수정
import Link from 'next/link'; // Next.js의 Link 컴포넌트를 임포트합니다.
import styles from './home.module.scss';

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.maintitle}>취준생의 시작 자기소개서,</h1>
      <h1 className={styles.maintitle}>  그 시작을 모노레터와 함께해보세요.</h1>
      <h1 className={styles.subtitle}>AI 직무역량 키워드 추천, AI 자기소개서 작성까지 취업 준비 과정의 고민을 해결해드릴게요</h1>
      <Link href="/selectcategory"> 
        <h1 className={styles.button}> Monoletter 시작하기</h1> 
      </Link>
    </div>
  );
}

export default Home;
