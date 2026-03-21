"use client"

import clsx from 'clsx'
import { Eye, EyeClosed } from 'lucide-react'
import React, { ChangeEvent, useEffect, useId, useRef, useState } from 'react'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    placeholderClass?: string,
    value?: string,
    onChange?: (e: string) => void

}

const Input = ({ id, type = "text", value, onChange, placeholder, className, placeholderClass, ...props }: InputProps) => {

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
        onChange?.(val);
    };

    // handle focus and blur
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // habdle password type input
    useEffect(() => {
        if (type === "password")
            setInputType(showPassword ? "text" : "password")
    }, [showPassword]);

    // handle typing
    useEffect(() => {
        if (value !== undefined && value !== input)
            setInput(value);
    }, [value]);

    return (
        <div className={clsx('w-full pt-4 h-fit flex items-center relative border border-gray-400 focus-within:border-(--primary) focus-within:ring-(--accent) focus-within:ring-[1px] rounded-2xl transition-all duration-150 overflow-hidden', className)}>
            <label
                htmlFor={uid}
                className={clsx("absolute top-4 ml-3 text-[1em] transition-all duration-200 cursor-text",
                    placeholderClass,
                    (isFocused || input) && "text-[0.8em] -translate-y-4 bg-transparent px-2 text-(--primary) ml-3")}>{
                    placeholder}
            </label>

            <input
                id={uid}
                type={inputType}
                data-slot="input"
                className={clsx("w-full py-2 px-4 outline-none border-none bg-transparent")}
                value={input}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props} />

            {type === "password" &&
                <button
                    type='button'
                    className="cursor-pointer absolute right-3"
                    onClick={() => setShowPassword(!showPassword)}>
                    {!showPassword ? <Eye size={17} /> : <EyeClosed size={17} />}
                </button>
            }
        </div>
    )
}

export default Input
