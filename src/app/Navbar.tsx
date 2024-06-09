"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { usePathname } from "next/navigation";
import { deletecookie } from "./api/cookie/route";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const logout = () => {
    try {
      deletecookie();
      console.log("로그아웃 성공");
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className={styles.navbar}>
      <div>
        <ul>
          <Link href="/">
            <h1 className={pathname === "/" ? styles.active : ""}>
              Mono Letter
            </h1>
          </Link>
          <li>
            <Link href="/letter">
              <h1
                className={pathname.startsWith("/letter") ? styles.active : ""}>
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
            <h1
              onClick={toggleMenu}>
              Mypage
            </h1>
            {isMenuOpen && (
        <div className={styles.myPageMenu}>
          <p onClick={logout}>로그아웃하기</p>
          <Link href="/selectcategory">         <p >직무 변경하기</p></Link>
 
        </div>
      )}

            {pathname === "/mypage" ? styles.active : ""}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
