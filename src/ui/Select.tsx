import { useState } from "react";
import { ArrowLeft } from "../ui/Icons";

type SelectProps = {
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    className?: React.ComponentProps<"div">["className"];
};
export function Select({ options, selectedOption, setSelectedOption, className }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    return (
        <div className={`${className} relative inline-block cursor-pointer bg-[var(--bg-color)] rounded-lg`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full min-h-9 transition-all duration-300 ease-in-out text-sm text-left bg-transparent border border-gray-400 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {selectedOption}
                <ArrowLeft className={`${isOpen ? "rotate-90" : "-rotate-90"} float-right duration-300 w-5 h-5 p-[1px]`} />
            </div>
            <div
                className={`absolute z-10 w-full bg-[var(--bg-color)] border border-gray-400 rounded-lg shadow-lg mt-1 transform transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
            >
                {isOpen && (
                    <ul>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-2 text-sm ${selectedOption === option ? "bg-slate-200/90" : "bg-[var(--bg-color)]"} duration-200 hover:bg-blue-200 cursor-pointer ${
                                    index === 0 ? "rounded-t-lg" : ""
                                } ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
