"use server";
import axios from "axios";

export const speller = async (letter: string) => {
  const response = await fetch("http://127.0.0.1:5000/speller", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ letter }),
  });
  return response.json();
};


export const checkUser = async (email: string) => {
  try {
    const response = await axios.post("https://localhost:5000/checkuser", {
      email: email,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("회원정보 확인 중 오류가 발생하였습니다.", error);
      throw error;
    } else {
      throw new Error("알 수 없는 오류");
    }
  }
};
