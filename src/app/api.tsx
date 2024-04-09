import axios from "axios";

interface SendDataResponse {
  message: string;
}

export const sendData = async (data: string): Promise<SendDataResponse> => {
  try {
    const response = await axios.post("/api", data, {
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    return response.data;
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
