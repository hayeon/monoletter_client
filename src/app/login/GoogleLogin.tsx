import axios from "axios";
import { sendUserInfo } from "./api";

//구글 oauth 로그인
const getGoogleData = async (code:string) => {
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
      const email = userInfo.data.email
      const name = userInfo.data.name;
      const detail = "프론트엔드"
      const check = sendUserInfo(email, name, detail)
      console.log(check, "회원정보 전송완료")
      return check;
    } catch (e) {
      console.log("사용자 정보 가져오기 오류", e);
    }
  } catch (e) {
    console.log("Access Token 받기 오류", e);
  }
};

export default getGoogleData;
