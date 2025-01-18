import { twMerge } from "tailwind-merge";
import React, { forwardRef, useId } from "react";
import { Controller } from "react-hook-form";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  control : any;
  className?: string;
}

export const DescriptionField = forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      label = "Write a description about the project ?",
      className = "",
      control,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    return (
      <div className={twMerge("inline-flex flex-col  w-full items-start")}>
        <label
          htmlFor={id}
          className="mb-1 mt-6 text-sm text-zinc-200"
        >
          {label}
        </label>
        <Controller
        name={'content'}
        control={control}
        render={({field}) => (
            <textarea
            {...field}
            placeholder="Enter the Descriptiion"
            className={twMerge(
                        "p-2 border-[1px] placeholder-zinc-500 text-zinc-300 w-full text-sm font-light bg-zinc-700/5 border-zinc-700 rounded-[4px] focus:bg-pink-500-400/50",
                        className
                      )}
            >
            </textarea>
        )}
        />
      </div>
    );
  }
);
