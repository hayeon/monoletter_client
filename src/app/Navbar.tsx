"use client"
import Link from "next/link";
import styles from "./Navbar.module.scss"; 
import { usePathname } from "next/navigation";
import { deletecookie, } from "./api/cookie/route";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = () => {
   try {
    deletecookie();
    console.log("로그아웃 성공");
    router.push("/");
   } catch (error) {
    
   }
  }
  return (
    <div className={styles.navbar}>
      <div>
        <ul>
        <Link href="/">
          <h1>Mono Letter</h1>
          </Link>
          <li>
            <Link href="/letter">
              <h1 className={pathname === "/letter" ? styles.active : ""}>
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
            {/* <Link href="/mypage"> */}
              <h1 className={pathname === "/mypage" ? styles.active : ""} onClick={logout}>
                Mypage
              </h1>
            {/* </Link> */}
            {pathname === "/mypage" ? styles.active : ""}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
