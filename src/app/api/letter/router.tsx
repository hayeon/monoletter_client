import axios from "axios";

export const addLetter = async (mainTitle: string) => {
  //자기소개서 생성하기

  const email = "hayun4475@gmail.com";
  try {
    const response = await axios.post("http://127.0.0.1:5000/addletter", {
      email: email,
      mainTitle: mainTitle,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("백엔드와 저장 통신 중 오류가 발생하였습니다.", error);
      throw error;
    } else {
      throw new Error("알 수 없는 오류");
    }
  }
};

export const loadLetter = async (mainTitle_id: string, subTitle_id: string) => {
  //자기소개서 불러오기
  try {
    const response = await axios.post("http://localhost:5000/loadletter", {
      mainTitle_id: mainTitle_id,
      subTitle_id: subTitle_id,
    });
    return response
  } catch (error) {
    console.error(error);
  }
};

export const saveLetter = async (
  //임시저장하기
  listTitle: string,
  question: string,
  letter: string
) => {
  const email = "hayun4475@gmail.com";
  try {
    const response = await axios.post("http://localhost:5000/saveletter", {
      email,
      letter,
      question,
      listTitle,
    });

    return response.status;
  } catch (error) {
    if (error instanceof Error) {
      console.error("백엔드와 저장 통신 중 오류가 발생하였습니다.", error);
      throw error;
    } else {
      throw new Error("알 수 없는 오류");
    }
  }
};
