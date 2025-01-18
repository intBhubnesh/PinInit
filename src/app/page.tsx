import { Header } from "@/components";
import Button from "../components/Button";
import Tag from "@/components/Tag";
import Link from "next/link";

export default function Home() {


  return (
    <div className="bg-zinc-900 h-screen w-full overflow-hidden">
                <Header />
                <div className="p-5 mt-4 flex flex-col gap-2">
                <Tag />
                <h1 className="text-6xl text-zinc-300 ">Capture Inspiration with One Click<span className="text-pink-600">_</span></h1>
                <p className="text-xl text-zinc-400 mt-8">Discover a seamless way to capture and organize inspiration from across the web. With just one click, save images to your personalized collection and bring your ideas to life. Whether you're building mood boards or gathering research, our extension gives you complete control over the images you need.</p>
                <div>
                    <Link
                    href='/sign'
                    >
                    <Button lable="Sign Up"  />
                    </Link>
                </div>
                </div>
    </div>
  );
}
