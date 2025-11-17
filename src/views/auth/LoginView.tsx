import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import type { LoginForm } from "../../types";
import api, { setAuthToken } from "../../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    const loginPromise = api.post("/auth/login", formData);

    // show toast tied to the axios promise; success receives the full response
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (res) => {
        // res is the axios response object; return a string to show in the toast
        reset();

        const token =
          res?.data?.token ?? (typeof res.data === "string" ? res.data : null);

        if (token) {
          setAuthToken(token);
          try {
            localStorage.setItem("cookMate_token", token);
          } catch {
            /* ignore localStorage errors in constrained environments */
          }
        } else {
          setAuthToken(undefined);
          try {
            localStorage.removeItem("cookMate_token");
          } catch {
            /* ignore */
          }
        }

        setTimeout(() => {
          navigate("/home");
        }, 2000);

        return "Logged in successfully!";
      },
      error: (err) => {
        // optional: return server error message if available
        if (isAxiosError(err) && err.response?.data?.error) {
          return String(err.response.data.error);
        }
        return "Failed to log in. Please try again.";
      },
    });
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
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
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="form-input w-full rounded-lg border-none bg-white dark:bg-black/20 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-3 text-center text-base font-bold text-white shadow-sm  hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark bg-green-950/80 hover:bg-green-950 hover:cursor-pointer transition-all"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <NavLink
          className="font-medium text-primary hover:underline hover:text-amber-800 hover:font-bold"
          to="/auth/register"
        >
          Create account
        </NavLink>
      </p>
    </>
  );
}
