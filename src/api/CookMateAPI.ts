import api from "../config/axios";
import { isAxiosError } from "axios";

export async function getAllUsers() {
  try {
    const { data } = await api.get(`/user`);
    console.log("🚀 ~ getUser ~ data:", data);
    if (data && data._id && !data.id) data.id = data._id;
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}
