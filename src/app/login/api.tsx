//백엔드로 사용자 정보 전송

import axios from "axios";

interface Response {
  statusCode: number;
  message: string;
}

export const sendUserInfo = async (
  email: string,
  name: string,
  detail: string
): Promise<Response> => {
  try {
    const response = await axios.post("http://localhost:5000/googlelogin", {
      email: email,
      name: name,
      detail: detail,
    });
    return {
      statusCode: response.status,
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("로그인 통신 에러", error);
      throw error;
    } else {
      console.error("구글 로그인 중 알 수 없는 오류");
      throw new Error("알 수 없는 오류");
    }
  }
};
