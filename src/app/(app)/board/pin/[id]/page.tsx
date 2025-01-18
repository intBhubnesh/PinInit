import { Header } from "@/components";
import PinCard from "@/components/PinCard";
import React from "react";


export default  function PinPage({ params  }: any ) {
    const {id} = React.use<any>(params)
    return <div className="bg-zinc-900 w-full h-screen">
        < Header/>
        <div className="w-full flex items-center mt-8 justify-center">
            <div className="w-2/3 h-[600px] overflow-hidden rounded-3xl bg-zinc-950">
            <div className="w-1/2 h-full bg-pink-500">

            </div>
            </div>
        </div>
    </div>;
  }
