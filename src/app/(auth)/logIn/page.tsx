"use client";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useState } from "react";
import { login as authLogin } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authServices from "@/services/auth";
import { useRouter } from "next/navigation";
import FormButton from "@/components/FormButton";

interface LoginInData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInData>();

  const logIn = async (data: LoginInData) => {
    setError("");
    try {
      const session = await authServices.logIn(data);
      if (session) {
        const userData = await authServices.getUser();
        console.log(userData, "user caught")
        if (userData) {
          await dispatch(authLogin(userData));
          console.log(userData, "user login")
          router.push("/board");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-zinc-950/95 h-screen flex w-full overflow-hidden">
      <div className="w-1/2 flex h-full relative z-0">
        <div className="absolute w-full top-0 left-0 -z-10 bg-pink-50 h-full">
          <img
            className="object-cover w-full h-full"
            src="https://cloud.appwrite.io/console/_app/immutable/assets/login-dark-mode.CXyYQeDN.png"
            alt="OnBoarding Image"
          />
        </div>
        <div className="px-8 py-16 flex w-full flex-col items-start justify-between">
          <h3 className="text-2xl font-semibold text-zinc-300">
            pinInit<span className="text-pink-600">_</span>
          </h3>
          <h2 className="text-6xl text-zinc-300">
            Save any inspiration from anywhere
            <span className="text-pink-600 text-5xl">_</span>
          </h2>
        </div>
      </div>
      <div className="p-8 items-start h-full max-w-[520px] m-auto justify-center w-1/2 flex-col inline-flex">
        <div className="w-full flex-col flex relative">
          <h3 className="text-2xl text-zinc-200 font-medium">Log In</h3>
          {error && (
            <div className="text-red-600 absolute top-1 left-24 bg-red-500/10 text-sm gap-2 rounded-full flex py-1 px-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(logIn)}>
            <div>
              <InputField
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value: string) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Enter a valid email",
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              <InputField
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  validate: (value: string) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                    "Password must be at least 8 characters long with an uppercase, lowercase, number, and special character",
                })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div className="w-full flex mt-6 gap-6 justify-center flex-col">
              <FormButton lable="Log In" type="submit" />
              <div className="flex w-full gap-5 items-center justify-between font-medium">
                <div className="h-[.5px] w-full bg-zinc-500"></div>
                <p className="text-[12px] text-zinc-500 tracking-wider font-semibold">OR</p>
                <div className="h-[.5px] w-full bg-zinc-500"></div>
              </div>
              <FormButton lable="Sign in with Github" bgColor="bg-zinc-700" />
            </div>
          </form>
          <div className="flex mt-6 items-center justify-center gap-5">
            <Link href="./forgotPassword" className="text-sm text-zinc-300">
              Forgot Password?
            </Link>
            <Link className="text-sm font-normal text-zinc-300 underline" href='/signUp'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
