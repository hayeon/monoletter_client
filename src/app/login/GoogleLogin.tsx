import React, { useEffect } from "react";
import axios from "axios";

const getGoogleData = async (code:string) => {

  try {
    //accesstoken 받기
    const response = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.id}&grant_type=authorization_code`
    ); 
    console.log("응답", response);
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
      {
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );
    console.log(userInfo);
  } catch (e) {
    console.log("로그인 오류", e);
  }
};

export default getGoogleData;
