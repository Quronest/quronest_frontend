"use client";

import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { useId, useState } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export default React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      className,
      error,
      placeholder,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="w-full">
        <div
          className={clsx(
            "relative flex h-12 w-full items-center overflow-hidden rounded-xl border transition-all duration-200",
            error
              ? "border-red-500"
              : "border-border focus-within:border-primary",
            className,
          )}
        >
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="h-full w-full bg-transparent px-4 outline-none placeholder:text-neutral"
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              className="absolute right-4 flex items-center justify-center text-neutral transition-colors duration-200 hover:text-primary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="mt-1 ml-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
