import React, { useEffect } from "react";
import axios from "axios";

function GoogleLogin() {
  const getGoogleData = async () => {
    const google_redirect_uri = "http://localhost:3000/oauth2/redirect";
    // 인가코드 가져오기
    let reqParams = new URL(document.location.toString()).searchParams;
    let code = reqParams.get("code");
    try {
      //accesstoken 받기
      const response = await axios.post(
        `https://oauth2.googleapis.com/token?code=${code}&client_id=546251093855-2ohtjiro762eksb3flaeb0gdlsm9n2nu.apps.googleusercontent.com&client_secret=${process.env.GOOGLE_CLIENT_SECRE}&grant_type=authorization_code`
      ); //받아온 코드로 access_token 얻어오기
      // 데이터 받아오기
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
        {
          headers: {
            authorization: `Bearer ${response.data.access_token}`,
          },
        }
      );
      console.log(userInfo);
    } catch (e) {}
  };
  //해당 주소로 접근된 경우에 getGoogleData()실행
  useEffect(() => {
    getGoogleData();
  }, []);
  return <div></div>;
}

export default GoogleLogin;
