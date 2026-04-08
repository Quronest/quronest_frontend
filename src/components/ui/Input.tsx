"use client";

import clsx from "clsx";
import { Eye, EyeClosed } from "lucide-react";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" 
> & {
  placeholderClass?: string;
  value?: string;
};

const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  placeholderClass,
  ...props
}: InputProps) => {
  const genId = useId();
  const uid = id || genId;

  // handle input
  const [input, setInput] = useState<string>(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState<string>(type);
  const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    onChange?.(e);
  };

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
  useEffect(() => {
    if (value && value !== input) setInput(value);
  }, [value]);

  return (
    <div
      className={clsx(
        "w-full pt-2 h-15 rounded-xl overflow-hidden",
        "flex items-center relative",
        "transition-all duration-250",
        className,
        (isFocused || input) &&
          "focus-within:border-primary! focus-within:border",
        !isFocused && "border border-neutral ",
      )}
    >
      <label
        htmlFor={uid}
        className={clsx(
          "absolute top-5 left-2 ml-3 ",
          "text-[1em] cursor-text text-neutral",
          "transition-all duration-200 ",
          placeholderClass,
          (isFocused || input) &&
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
        value={input}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {type === "password" && (
        <button
          type="button"
          className={clsx("cursor-pointer absolute right-4 top-5.5", (isFocused || input) && "text-primary/90 transition-all duration-300" )}
          onClick={handlePasswordToggle}
        >
          {!showPassword ? <Eye size={19} /> : <EyeClosed size={19} />}
        </button>
      )}
    </div>
  );
};

export default Input;
