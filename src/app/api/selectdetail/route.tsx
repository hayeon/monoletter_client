"use server"
import axios from "axios";

export const sendDetail = async (detail: string) => {
    const email = "hayun4475@gmail.com"
    try {
        const response = await axios.put('http://127.0.0.1:5000/updatedetail', {
          email,
          detail,
        });
    
        return response.status;
      } catch (error) {
      if (error instanceof Error) {
        console.error("백엔드와 통신 중 오류가 발생하였습니다.", error);
        throw error;
      } else {
        throw new Error("알 수 없는 오류");
      }
    }
  };

  export const checkUser = async (email:string) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/checkuser", {
        email: email
      })
      return response;
    }
    catch (error) {
      if (error instanceof Error) {
        console.error("회원정보 확인 중 오류가 발생하였습니다.", error);
        throw error;
      } else {
        throw new Error("알 수 없는 오류");
      }
    }
  }