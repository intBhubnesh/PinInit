"use client";
import React, { useId, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface DropDownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
}

const InputDropDown = forwardRef<HTMLSelectElement, DropDownProps>(
  ({ label = "Board", options = [], className, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={twMerge("inline-flex flex-col min-w-72 w-full items-start", className)}>
        <label htmlFor={id} className="mb-1 mt-6 text-sm text-zinc-200">
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          name={label}
          className={twMerge(
            "rounded-md border-[1px] text-sm placeholder-zinc-500 text-zinc-300 w-full font-light bg-zinc-700/5 border-zinc-700 focus:ring-pink-500 px-3 py-2",
            className
          )}
          {...rest}
        >
          {options.map((option) => (
            <option className="text-sm " key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);


export default InputDropDown;
