interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "quaternary";
}

const Button = ({ className, variant, ...props }: ButtonProps) => {
    const variantClasses = {
        primary: "bg-black text-white hover:bg-black/70",
        secondary: "bg-orange-500 shadow-md shadow-black/30 text-white hover:bg-orange-600",
        tertiary: "bg-red-600/85 shadow-md shadow-black/30 text-white hover:bg-red-700/85",
        quaternary: "bg-transparent hover:bg-slate-200 hover:underline",
    };

    const buttonClasses = `${variant && variantClasses[variant]} ${className ? className : ""}`;

    return (
        <button
            className={`flex items-center justify-center rounded-lg px-4 py-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${buttonClasses}`}
            {...props}
        />
    );
};

export { Button };
