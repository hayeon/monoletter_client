import axios from "axios";

export const sendCode = async (code: string) => {
  try {
    const response = await axios.post("http://localhost:5000/googlelogin", {
      code: code,
      txt: "전송"
    });
    console.log("성공"+ response);
    const jwt = response.data;
    return jwt;
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
