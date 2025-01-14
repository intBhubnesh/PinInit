'use client'
import React, { useState , useEffect } from 'react'
import { UseDispatch } from 'react-redux'
import authServices from '@/services/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from '@/store/authSlice'
import { Footer, Header } from '@/components'
import PostCard from '@/components/PostCard'


export default function Page(){



    const dispatch =  useDispatch()
    useEffect(() => {
        authServices.getUser()
            .then((userData) => {
                if(userData){
                    dispatch(login(userData))
                } else {
                    dispatch(logout())
                }
            })
            .catch(
                (error) => {
                    // Handle error gracefully
                    console.error("Error fetching user data:", error);
                    // Optionally, show an error state to the user
                }
            )
    }, [])


  return (
    <>
    <Header />
    <div className='text-3xl text-zinc-500 text-center'>
       Home
       <PostCard $id='asd' source='pin' featuredImage='' />
    </div>
    <Footer/>
    </>
  )
}
