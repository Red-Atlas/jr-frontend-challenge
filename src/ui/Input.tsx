import { Button } from "./Button";
import { DetailsIcon } from "./Icons";

type InputProps = {
    placeholder?: string;
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
};

export function Input({ placeholder, children, className = "", ...props }: InputProps) {
    return (
        <input
            className={`w-full text-xl md:text-sm md:w-[400px] bg-[var(--bg-color)] border-[1px] border-black/30 rounded-lg px-3 py-2 outline-none focus:border-blue-300 ${className}`}
            placeholder={placeholder}
            type="email"
            {...props}
        >
            {children}
        </input>
    );
}

export function SearchInput({ placeholder, children, className = "", ...props }: InputProps) {
    return (
        <div className="flex gap-2 pl-2 w-fit items-center mb-8 bg-[var(--bg-color)] border-[1px] rounded-[10px] border-black/30 ">
            <DetailsIcon className="w-5 h-5 md:p-[2px]" />
            <Input
                {...props}
                type="text"
                className={`bg-transparent !border-r-0 !border-t-0 !border-b-0 focus:!border-l-black/30 !rounded-sm !text-sm md:!text-md ${className}`}
                placeholder={placeholder}
            >
                {children}
            </Input>
            <Button type="submit" className="w-28 h-8 mr-1" variant="primary">
                Buscar
            </Button>
        </div>
    );
}
