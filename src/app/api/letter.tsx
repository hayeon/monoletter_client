import axios from "axios";

export const sendLetter= async ( listTitle:string,  question: string, letter: string, ) => {

    const email = "hayun4475@gmail.com"
    try {
        const response = await axios.post('http://localhost:5000/add_letter', {
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
