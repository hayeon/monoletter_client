
import styles from "./Home.module.scss";
import WriteLetter from "./writeLetter";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.innerBox}>자기소개서 리스트</div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.innerBox}>
            <WriteLetter />
          </div>
        </div>
        <div className={styles.rightBottom}>
          <div className={styles.innerBox}>오른쪽 2</div>
        </div>
      </div>
    </div>
  );
}
