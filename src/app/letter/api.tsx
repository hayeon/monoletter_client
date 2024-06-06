import axios from "axios";
export const sendData = async (letter: string, title: string) => {
  try {
    const mail = "hayun4475@gmail.com"
    const response = await axios.post("http://localhost:5000/data", {
      title: title,
      letter: letter,
      mail: mail
    });
    const feedback = response.data;
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
