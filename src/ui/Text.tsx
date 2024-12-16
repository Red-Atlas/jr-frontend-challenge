type SpanPopUpProps = React.HTMLAttributes<HTMLSpanElement>;

/* SpanPopUp - In order to work it must be wrapped in a div with className = "relative group" with the component you want to hover */
export const SpanPopUp = ({ children, className, ...props }: SpanPopUpProps) => {
    return (
        <span
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-black bg-gray-300 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

import React, { ReactNode } from "react";

type SpanToggleProps = {
    children: ReactNode;
    className?: string;
    variant?: "default" | "primary" | "secondary" | "custom";
    [key: string]: unknown;
};

export const SpanToggle = ({ children, className, variant = "custom", ...props }: SpanToggleProps) => {
    const mappedVariants = {
        default: "flex items-center relative group gap-1 px-2",
        primary: "text-xs rounded-full bg-gray-300 text-black px-2 py-1",
        secondary: "text-xs bg-blue-200 text-black px-2 py-1",
        custom: "",
    };
    return (
        <span className={`cursor-default rounded-full ${variant && mappedVariants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
};

export function H1({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1 className={`text-4xl md:text-6xl font-bold ${className}`} {...props}>
            {children}
        </h1>
    );
}
export function H2({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 className={`text-2xl md:text-3xl font-bold ${className}`} {...props}>
            {children}
        </h2>
    );
}
