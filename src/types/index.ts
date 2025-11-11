export type User = {
  id?: string;
  handle: string;
  name: string;
  email: string;
};

export type UserSocial = Pick<User, "handle" | "name" | "email"> & {
  _id: string;
  favorites: string[];
  recipes: string[];
};

export type RegisterForm = Pick<User, "handle" | "name" | "email"> & {
  password: string;
  confirmPassword: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type CreateRecipeForm = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  category: string;
  author: string;
};
