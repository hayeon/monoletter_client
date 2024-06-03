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
      email: "hayun4475@gmail.com",
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const loadAllLetter = async (mainTitle_id: string) => {
  "use sever"
  //자기소개서 불러오기
  try {
    const response = await axios.post("http://localhost:5000/loadallletter", {
      mainTitle_id: mainTitle_id,
      email: "hayun4475@gmail.com",
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const saveLetter = async (   //임시저장하기
mainTitle_id: string,
  subTitle_id: string,
  subTitle: string,
  letter: string,
  feedback: string
) => {
  "use sever"
  const email = "hayun4475@gmail.com";
  feedback = ""
  try {
    const response = await axios.post("http://localhost:5000/saveletter", {
      email,
      mainTitle_id,
      subTitle_id,
      subTitle,
      letter,
      feedback,
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

export const addSubLetter = async (mainTitle_id: string) => {
  //자기소개서 항목 추가하기

  const email = "hayun4475@gmail.com";
  try {
    const response = await axios.post("http://127.0.0.1:5000/addsubletter", {
      email: email,
      mainTitle_id: mainTitle_id,
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
export const delSubLetter = async (mainTitle_id: string,  subTitle_id:string) => {
  //자기소개서 항목 삭제하기
  const email = "hayun4475@gmail.com";
  try {
    const response = await axios.post("http://127.0.0.1:5000/delsubletter", {
      email: email,
      mainTitle_id: mainTitle_id,
      subTitle_id: subTitle_id
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
