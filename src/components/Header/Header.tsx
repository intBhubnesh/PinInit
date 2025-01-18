"use client"
import { useSelector } from "react-redux"
import Button from "../Button"
import { RootState } from "@/store/store"
import LogOutBtn from "./LogOutBtn"
import Link from "next/link"

const Header = () => {
    const status = useSelector((state : RootState) => state.auth.status)

  return (
    <header className="border-b-[1px] border-zinc-600/40 backdrop-blur-lg bg-black/5">
        <nav className="py-4 px-6 flex items-center justify-between">
            <div>
                <h3 className="text-2xl font-semibold text-zinc-300">pinInit<span className="text-pink-600">_</span></h3>
            </div>
            <div>
                <Link href='/board'>Board</Link>
                <Link href='/createPost'>CreatePost</Link>
            </div>
            <div className="">
                {
                    status ? (
                        <LogOutBtn />
                    ) : (
                        < Button  />
                    )
                }
            </div>
        </nav>
    </header>
  )
}

export default Header
