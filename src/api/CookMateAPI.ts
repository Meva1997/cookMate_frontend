import api from "../config/axios";
import { isAxiosError } from "axios";
import type { RecipeArray, User, UserSocial, UserWithRecipes } from "../types";

export async function getAllUsers() {
  try {
    const { data } = await api.get(`/user`);
    // Backwards-compatible: if the API returns a paged shape, return the users array
    if (
      data &&
      typeof data === "object" &&
      Array.isArray((data as any).users)
    ) {
      return (data as any).users as UserSocial[];
    }
    return data as UserSocial[];
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export type UsersPage = {
  users: UserSocial[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export async function getAllUsersPaged(page = 1, limit = 20) {
  try {
    const { data } = await api.get<UsersPage>(`/user`, {
      params: { page, limit },
    });
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function getUserProfileData() {
  try {
    const { data } = await api.get("/auth/me");
    console.log("🚀 ~ getUserProfileData ~ data:", data);
    return data.user;
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

export type RecipesPage = {
  recipes: RecipeArray[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export async function getAllRecipes(page = 1, limit = 20) {
  try {
    const { data } = await api.get<RecipesPage>(`/recipes`, {
      params: { page, limit },
    });
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function uploadRecipeImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post(`/recipes/upload-image`, formData);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function updateRecipeById(
  recipeId: string,
  payload: Partial<RecipeArray>
) {
  try {
    const { data } = await api.put(`/recipes/${recipeId}`, payload);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}

export async function deleteRecipeById(recipeId: string) {
  try {
    const { data } = await api.delete(`/recipes/${recipeId}`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response?.data?.error) {
      return String(err.response.data.error);
    }
  }
}
