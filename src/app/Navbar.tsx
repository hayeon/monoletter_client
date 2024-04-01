import Link from "next/link";
import styles from "./Navbar.module.scss"; 
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <div>
        <ul>
          <h1>Mono Letter</h1>
          <li>
            <Link href="/">
              <h1 className={pathname === "/" ? styles.active : ""}>
                자기소개서 작성하기
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/all">
              <h1 className={pathname === "/all" ? styles.active : ""}>
                모아보기
              </h1>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/mypage">
              <h1 className={pathname === "/mypage" ? styles.active : ""}>
                Mypage
              </h1>
            </Link>
            {pathname === "/mypage" ? styles.active : ""}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
