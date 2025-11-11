import api from "../config/axios";
import { isAxiosError } from "axios";
import type { UserSocial } from "../types";

export async function getAllUsers() {
  try {
    const { data } = await api.get<UserSocial[]>(`/user`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function getUserById(userId: string) {
  try {
    const { data } = await api.get<UserSocial>(`/user/${userId}`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function updateUserProfileById(userId: string) {
  try {
    const { data } = await api.put(`/user/${userId}`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}
