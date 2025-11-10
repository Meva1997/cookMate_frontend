import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import api from "../../config/axios";
import { useState } from "react";
import ShowPassword from "../../components/ShowPassword";
import HidePassword from "../../components/HidePassword";

export default function RegisterView() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues: RegisterForm = {
    handle: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleRegister = async (formData: RegisterForm) => {
    const registerPromise = api.post("/auth/register", formData);

    // show toast tied to the axios promise; success receives the full response
    toast.promise(registerPromise, {
      loading: "Creating your account...",
      success: (res) => {
        // res is the axios response object; return a string to show in the toast
        reset();
        return String(res.data);
      },
      error: (err) => {
        // optional: return server error message if available
        if (isAxiosError(err) && err.response?.data?.error) {
          return String(err.response.data.error);
        }
        return "Failed to create account. Please try again.";
      },
    });
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
        <div>
          <label className="sr-only" htmlFor="handle">
            Nick Name
          </label>
          <input
            id="handle"
            type="text"
            autoComplete="name"
            placeholder="Nick Name"
            inputMode="text"
            className="form-input w-full rounded-lg border-none bg-white dark:bg-black/20 p-4 text-gray-900  dark:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            {...register("handle", {
              required: "Nick Name is required",
              minLength: {
                value: 3,
                message: "Nick Name must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Nick Name must be at most 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Nick Name can only contain letters, numbers, and underscores",
              },
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label className="sr-only" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            inputMode="text"
            className="form-input w-full rounded-lg border-none bg-white dark:bg-black/20 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
              maxLength: {
                value: 50,
                message: "Full name must be at most 50 characters",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            inputMode="email"
            className="form-input w-full rounded-lg border-none bg-white dark:bg-black/20 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div>
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password"
              inputMode="text"
              className="form-input w-full rounded-lg border-none bg-white dark:bg-black/20 p-4 pr-12 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)} // Toggle password visibility when clicked it becomes true and false when clicked again
              className="absolute inset-y-0 right-2 inline-flex items-center p-2 text-gray-600 dark:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* eye-off */
                <ShowPassword />
              ) : (
                /* eye */
                <HidePassword />
              )}
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* confirmPassword */}
        <div>
          <label className="sr-only" htmlFor="confirmPassword">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm password"
              inputMode="text"
              className="form-input w-full rounded-lg border-none bg-white dark:bg-black/20 p-4 pr-12 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute inset-y-0 right-2 inline-flex items-center p-2 text-gray-600 dark:text-gray-300"
              aria-label={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showConfirm ? <ShowPassword /> : <HidePassword />}
            </button>
          </div>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-3 text-center text-base font-bold text-white shadow-sm  hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark bg-green-950/80 hover:bg-green-950 hover:cursor-pointer transition-all"
          >
            Create account
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <NavLink
          className="font-medium text-primary hover:underline hover:text-amber-800 hover:font-bold"
          to="/auth/login"
        >
          Sign in
        </NavLink>
      </p>
    </>
  );
}
