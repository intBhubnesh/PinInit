"use client"
import InputField from "@/components/InputField"
import Link from "next/link"
import {  useState } from "react"
import { login as authLogin } from "@/store/authSlice"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import authServices from "@/services/auth"
import { redirect } from "next/navigation"

interface LoginInData {
    email: string
    password: string
}

const page = () => {
    const [error, setError] = useState<string>('')
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm<LoginInData>();



    const logIn = async (data: LoginInData) => {
        setError("")
        try {
            const session = await authServices.logIn(data)
            console.log("data :", data);

            if (session) {
                const userData = await authServices.getUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    console.log("userData :", userData);
                    redirect("/home")
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }

    return (
        <div className="bg-zinc-950/95 h-screen flex w-full overflow-hidden">
            <div className="w-1/2 flex  h-full relative z-0">
                <div className="absolute w-full top-0 left-0 -z-10 bg-pink-50 h-full ">
                    <img className="object-cover w-full h-full "  src="https://cloud.appwrite.io/console/_app/immutable/assets/login-dark-mode.CXyYQeDN.png" alt="OnBoarding Image" />
                </div>
                <div className="px-8 py-16 flex w-full flex-col items-start justify-between">
                    <h3 className="text-2xl font-semibold text-zinc-300">pinInit<span className="text-pink-600">_</span></h3>
                    <h2 className="text-6xl text-zinc-300 ">Save any inpiration form anywhere<span className="text-pink-600 text-5xl">_</span></h2>
                </div>
            </div>
            <div className="p-8 items-start h-full max-w-[520px] m-auto justify-center w-1/2 flex-col inline-flex">
                <div className="w-full flex-col flex relative">
                    <h3 className=" text-2xl text-zinc-200  font-medium">Sign in</h3>
                    {
                        error && (
                            <div className="text-red-600 absolute top-1 left-24 bg-red-500/10 text-sm gap-2 rounded-full flex  py-1 px-2 items-center justify-center">
                        <div className="inline-flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>

                        </div>
                        <p >
                            {error}
                        </p>
                    </div>
                        )
                    }
                    <form onSubmit={handleSubmit(logIn)}>
                    <div>
                        <div className="w-full ">
                            <InputField label="Email" type="email"  {...register("email", {
                                required : true,
                                validate : (value : string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "enter email must be valid"
                            })} />
                        </div>
                        <div>
                            <InputField label="Password" type="password" {...register("password", {
                                required : true,
                                validate : (value : string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must be at least 8 characters long, with an uppercase, lowercase, number, and special character",
                            })} />
                        </div>
                    </div>
                    <div className="w-full flex mt-6 gap-6 justify-center flex-col">
                        <div className="inline-flex items-center justify-center">
                            <FormButton
                                lable='Log In'
                                type="submit"
                            />
                        </div>
                        <div className="flex w-full gap-5 items-center justify-between  font-medium">
                            <div className=" h-[.5px] w-full bg-zinc-500"></div>
                            <p className="text-[12px] text-zinc-500 tracking-wider font-semibold">OR</p>
                            <div className=" h-[.5px] w-full bg-zinc-500"></div>
                        </div>
                        <div className="inline-flex items-center justify-center">
                            <FormButton
                                lable='Signin with Github'
                                bgColor=' bg-zinc-700'
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="white" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>}
                            />
                        </div>
                    </div>
                    </form>
                    <div className="flex mt-6 items-center justify-center gap-5">
                        <div>
                            <Link href='./forgotPassword' className="text-sm text-zinc-300">Forgot Password ?</Link>
                        </div>
                        <div className="h-4 w-[.5px] bg-zinc-500/60">

                        </div>
                        <div>
                            <Link href='./signUp' className="text-sm text-zinc-300">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
