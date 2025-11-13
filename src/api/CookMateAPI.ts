import api from "../config/axios";
import { isAxiosError } from "axios";
import type { RecipeArray, User, UserSocial, UserWithRecipes } from "../types";

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

export async function updateUserProfileById(userId: string, formData: User) {
  try {
    const { data } = await api.put<string>(`/user/${userId}`, formData);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function getUserRecipes(userId: string) {
  try {
    const { data } = await api.get<UserWithRecipes>(`/user/${userId}/recipes`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function getRecipeById(recipeId: string) {
  try {
    const { data } = await api.get<RecipeArray>(`/recipes/${recipeId}`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function getUserFavorites(userId: string) {
  try {
    const { data } = await api.get<RecipeArray[]>(`/user/${userId}/favorites`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function getAllRecipes() {
  try {
    const { data } = await api.get<RecipeArray[]>(`/recipes`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}
