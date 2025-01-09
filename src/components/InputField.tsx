"use client";
import React, { forwardRef, useId } from "react";

interface InputProps {
  label: string;
  type?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", className = "" }, ref) => {
    const id = useId();

    return (
      <div className={`inline-flex flex-col min-w-72 max-w-[400px] w-full ${className}`}>
        <label htmlFor={id} className="mb-1 mt-6 text-sm text-zinc-200">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={label}
          required
          className="p-2 border-[1px] text-zinc-300 w-full text-sm bg-zinc-400/5 border-zinc-600 rounded-[4px] focus:bg-pink-500-400/50"
        />
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
