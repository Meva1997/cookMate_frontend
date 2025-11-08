export type User = {
  handle: string;
  name: string;
  email: string;
};

export type RegisterForm = Pick<User, "handle" | "name" | "email"> & {
  password: string;
  confirmPassword: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};
