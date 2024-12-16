import { Link } from "react-router-dom";

interface TabProps {
    title: string;
    link: string;
    icon: string;
    description: string;
    className?: string;
}

export function Tab({ title, link, icon, description, className }: TabProps) {
    return (
        <div
            className={`bg-slate-200 h-[300px] w-[250px] hover:bg-slate-300 shadow-md text-gray-500 hover:text-blue-500 shadow-black/30 rounded-xl cursor-pointer transition-all duration-200 ease-linear ${className}`}
        >
            <Link className="flex flex-col justify-center items-center h-full p-6 bg-hero-gradient" to={link}>
                <h3 className="text-7xl font-bold mb-2 text-center">{icon}</h3>
                <p className="text-xl text-center">{title}</p>
                <p className="text-sm text-center">{description}</p>
            </Link>
        </div>
    );
}
