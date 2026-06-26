"use client";

import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  placeholderClass?: string;
  value?: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      value,
      onChange,
      onBlur,
      placeholder,
      className,
      error,
      placeholderClass,
      ...props
    },
    ref,
  ) => {
    const genId = useId();
    const uid = id || genId;

    // handle input
    const [hasValue, setHasValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState<string>(type);
    const [showPassword, setShowPassword] = useState(false);

    // handle focus and blur
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // habdle password type input
    const handlePasswordToggle = () => {
      setShowPassword((p) => !p);
      if (type === "password") setInputType(showPassword ? "text" : "password");
    };

    // handle typing
    // useEffect(() => {
    //   if (value && value !== input) setInput(value);
    // }, [value]);

    return (
      <div className="w-full">
        <div
          className={clsx(
            "w-full pt-2 h-15 rounded-xl overflow-hidden",
            "flex items-center relative",
            "transition-all duration-250",
            className,
            error
              ? "border border-red-500"
              : isFocused
                ? "border border-primary"
                : "border border-neutral",
          )}
        >
          <label
            htmlFor={uid}
            className={clsx(
              "absolute top-5 left-2 ml-3 ",
              "text-[1em] cursor-text text-neutral",
              "transition-all duration-200 ",
              placeholderClass,
              error ? "text-red-500" : "text-neutral",

              (isFocused || hasValue) &&
                "text-[0.8em] -translate-y-5 bg-transparent text-primary ml-3 origin-left",
            )}
          >
            {placeholder}
          </label>

          <input
            id={uid}
            type={inputType}
            data-slot="input"
            className={clsx(
              "w-full py-2 px-5 outline-none border-none bg-transparent",
            )}
            ref={ref}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              onChange?.(e);
            }}
            onFocus={handleFocus}
            onBlur={(e) => {
              onBlur?.(e);
              handleBlur();
            }}
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              className={clsx(
                "cursor-pointer absolute right-4 top-5.5",
                (isFocused || hasValue) &&
                  "text-primary/90 transition-all duration-300",
              )}
              onClick={handlePasswordToggle}
            >
              {!showPassword ? <Eye size={19} /> : <EyeClosed size={19} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 ml-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

export default Input;
