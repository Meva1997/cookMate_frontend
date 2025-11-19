export type User = {
  id?: string;
  handle: string;
  name: string;
  email: string;
  description?: string;
};

export type UsersPage = {
  users: UserSocial[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type UserLoggedIn = {
  id: string;
  handle: string;
  email: string;
};
export type UserSocial = Pick<
  User,
  "handle" | "name" | "email" | "id" | "description"
> & {
  _id: string;
  favorites: string[];
  recipes: string[];
};

export type RegisterForm = Pick<
  User,
  "handle" | "name" | "email" | "description"
> & {
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
  image: string;
  author: string;
};

export type RecipesPage = {
  recipes: RecipeArray[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type RecipeArray = {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  image: string;
  author: {
    _id: string;
    name: string;
  };
  likes: string[];
  favorites: string[];
};

export type UserWithRecipes = {
  _id: string;
  handle: string;
  name: string;
  email: string;
  favorites: string[];
  recipes: RecipeArray[];
};
export type Comment = {
  _id: string;
  author: {
    _id: string;
    handle: string;
  };
  recipe: string;
  text: string;
  __v: number;
};
