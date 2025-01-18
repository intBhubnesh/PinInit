import React from 'react'
import Button from '../Button'
import authServices from '@/services/auth'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'
import { useRouter } from 'next/navigation'


const LogOutBtn= () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const onClick = () => {
        authServices.logOut()
            .then(() => dispatch(logout()))
            .catch(() => Error("Error logging out. Please try again later.")
            )
        router.push('./')
    }
  return (
    <div>
        <Button lable='Log Out' onClick={onClick} />
    </div>
  )
}

export default LogOutBtn
