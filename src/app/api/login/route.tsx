//백엔드로 사용자 정보 전송
"use server";
import axios from "axios";
import { loginCookie } from "../cookie/route";

interface Response {
  status: number;
  message: string;
}

export const getGoogleData = async (code: string) => {
  try {
    // Access token 받기
    const response = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLINET_ID}&client_secret=${process.env.GOOGLE_CLINET_SEC}&redirect_uri=http://localhost:3000&grant_type=authorization_code`
    );
    try {
      // 사용자 정보 가져오기
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
        {
          headers: {
            authorization: `Bearer ${response.data.access_token}`,
          },
        }
      );
      const email = userInfo.data.email;
      const name = userInfo.data.name;
      const detail = "";

      try {
        const check = sendUserInfo(email, name, detail);
        loginCookie(email);
        return check;
      } catch (e) {
        console.log("사용자 정보 보내기 오류", e);
      }
    } catch (e) {
      console.log("사용자 정보 가져오기 오류", e);
    }
  } catch (e) {
    console.log("Access Token 받기 오류", e);
  }
};

export const sendUserInfo = async (
  email: string,
  name: string,
  detail: string
): Promise<Response> => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/googlelogin", {
      email: email,
      name: name,
      detail: detail,
    });
    if (response.status === 200) {
      loginCookie(email);
    }
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("백엔드와 통신 중, 오류가 발생하였습니다.", error);
      throw error;
    } else {
      throw new Error("알 수 없는 오류");
    }
  }
};
