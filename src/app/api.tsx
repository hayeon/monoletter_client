import axios from "axios";
export const sendData = async (letter: string, title:string) => {
  try {
    const response = await axios.post("http://localhost:5000/data", {
      title: title,
      letter: letter

    });
    console.log("서버 응답", response.data);
    const feedback = response.data;
    console.log(feedback);
    return feedback;
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    } else {
      console.error("알 수 없는 오류");
      throw new Error("알 수 없는 오류");
    }
  }
};
