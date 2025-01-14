import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
    lable ?: string
    bgColor ?: string
    type?: "button" | "submit" | "reset"
    icon?: any
    onClick?: any
    className?: string
}

const FormButton: React.FC<ButtonProps> = ({
    lable = "Continue",
    bgColor = 'bg-pink-600',
    type = "button",
    icon ,
    onClick ,
    className = ''
}) => {
    return (
        <>
            <button className={twMerge(`w-full flex ${icon && 'gap-2'} items-center justify-center text-white text-sm font-semibold  ${bgColor}  h-10 rounded-[4px]`, className)} type={type} onClick={onClick}>
            <div className='inline-flex  items-center justify-center'>
                {icon &&
                   (icon)
                   }
            </div>
            <h5 className='inline-flex items-center justify-center font-semibold'>
            {lable}
            </h5>
                </button>
        </>
    )
}

export default FormButton
