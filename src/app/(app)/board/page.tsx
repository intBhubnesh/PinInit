'use client'
import React, { useState , useEffect } from 'react'

import { Footer, Header } from '@/components'
import services from '@/services/config'
import PinCard from '@/components/PinCard'

export default function Page(){

 const [post, setPost] = useState<any>([])
 useEffect(( )=> {} , [])
 services.getPinList([])
    .then(posts => {
        if(posts)
            setPost(posts.documents)
    })
  .catch(error => {
    console.log("Error while feaching the posts :",error);
  })

  return (
    <>
        <div className='bg-zinc-900 h-screen w-full overflow-hidden'>
            <Header />
                <div className='image-holder text-3xl text-zinc-500 text-center'>
                    {
                        post.map((post : any) => (
                            <div>
                                <PinCard {...post} />
                            </div>
                        ))
                    }
                </div>
            <Footer/>
        </div>
    </>
  )
}
