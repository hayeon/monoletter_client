"use server";

import { cookies } from "next/headers";

//로그인 시 쿠키 생성
export const loginCookie = async (email: string) => {
  try {
    cookies().set({
        name: "usercheck",
        value: email,
        httpOnly: true, // 클라이언트에서 접근 불가
        path: "/", // 모든 경로에서 쿠키 유효
        maxAge: 7 * 24 * 60 * 60 
      });
  } catch (error) {
    console.log("쿠키 설정 오류", error);
    
  }
};

//로그아웃 시 쿠키 삭제
export const deletecookie = async () => cookies().delete("usercheck");
