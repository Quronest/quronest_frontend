import clsx from 'clsx';
import { ClassValue } from 'clsx';
import React, { ReactNode } from 'react'

type ButtonProps = Omit<React.HTMLAttributes<HTMLButtonElement>, "type"> & {
    children: ReactNode,
    variant?: "primary" | "outline",
    className?: string,
    type?: "button" | "submit" | "reset",
    id?: string
};

const variants: Record<string, ClassValue> = {
    "primary": "text-white bg-(--primary) font-bold ",
    "outline": "bg-transparent border-2 border-(--primary) ",

}

const Button = ({ id, type, className, children, variant = "primary", ...props }: ButtonProps) => {
    return (
        <button
            id={id}
            type={type}
            className={clsx(
                "flex items-center transition-all duration-400 hover:brightness-110 active:translate-y-1 px-4 py-2 rounded-lg cursor-pointer disabled:brightness-75 disabled:cursor-not-allowed ",
                className, 
                variants[variant])}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;
