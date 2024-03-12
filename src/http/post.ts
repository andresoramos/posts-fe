import axios, { AxiosResponse } from "axios";

interface PostData {
  id: string;
}

export async function postDataToApi(url: string, postData: PostData) {
  try {
    const response: AxiosResponse = await axios.post(url, postData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
