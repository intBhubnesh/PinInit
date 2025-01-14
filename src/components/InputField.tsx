"use client";
import React, { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
  }


const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", className = "", ...rest }, ref) => {
    const id = useId();

    return (
      <div className={`inline-flex flex-col min-w-72  w-full ${className}`}>
        <label htmlFor={id} className="mb-1 mt-6 text-sm text-zinc-200" >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={`Your ${label}`}
          required
          className="p-2 border-[1px] placeholder-zinc-500 text-zinc-300 w-full text-sm font-light bg-zinc-700/5 border-zinc-700 rounded-[4px] focus:bg-pink-500-400/50"
          {...rest}
        />
      </div>
    );
  }
);
 
InputField.displayName = "InputField";

export default InputField;
