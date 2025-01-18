"use client"
import Button from "@/components/Button"
import InputField from "@/components/InputField"
import Link from "next/link"
import { useRef, useState } from "react"

const page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const ref = useRef(null)

  return (
    <div className="bg-zinc-950/95 h-screen flex w-full overflow-hidden">
        <div className="w-1/2 flex  h-full relative z-0">
            <div className="absolute w-full top-0 left-0 -z-10 bg-pink-50 h-full ">
                <img className="object-cover w-full h-full " src="https://cloud.appwrite.io/console/_app/immutable/assets/login-dark-mode.CXyYQeDN.png" alt="" />
            </div>
            <div className="px-8 py-16 flex w-full flex-col items-start justify-between">
                <h3 className="text-2xl font-semibold text-zinc-300">pinInit<span className="text-pink-600">_</span></h3>
                <h2 className="text-6xl text-zinc-300 ">Save any inpiration form anywhere<span className="text-pink-600 text-5xl">_</span></h2>
            </div>
        </div>
        <div className="p-8 items-start h-full max-w-[520px] m-auto justify-center w-1/2 flex-col inline-flex">
            <div className="w-full">
                <h3 className="text-2xl text-zinc-200  font-medium">Password Recovery</h3>
                <div>
                    <div>
                        <InputField label="Email" type="email" ref={ref}/>
                    </div>
                </div>
                <div className="w-full flex mt-6 gap-6 justify-center flex-col">
                        <div className="inline-flex items-center justify-center">
                            <button className="w-full  text-white text-sm font-semibold  bg-pink-600 h-10 rounded-[4px]">Recover</button>
                        </div>

                </div>
                <div className="flex mt-6 items-center justify-center gap-5">
                    <div>
                        <Link href='./signIn' className="text-sm text-zinc-300">Sign In</Link>
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
