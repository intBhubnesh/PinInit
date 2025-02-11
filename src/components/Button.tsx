"use client"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
interface ButtonProps {
    lable ?: string,
    bgColor ?: string,
    textColor ?: string,
    type ?: any,
    onClick ?: () => void
    className ?: string,
}

const Button : React.FC<ButtonProps> = ({
    lable = "Get started" ,
    bgColor = 'bg-pink-600',
    textColor = "text-pink-50",
    type = 'submit',
    className,
    onClick
}) => {
  return (
    <motion.button
    onClick={onClick}
    whileHover={{
        boxShadow: "0px 1px 32px rgba(219, 39, 119, 0.5 )", // Smooth shadow on hover
    }}
    transition={{
        duration: 0.3, // Smooth transition duration
        ease: "easeInOut", // Transition easing
    }}

    className={twMerge(`px-4 py-2 rounded-lg     font-medium shadow-lg ${bgColor} ${textColor}`, className)} type={type}>
        {lable}
    </motion.button>
  )
}

export default Button
