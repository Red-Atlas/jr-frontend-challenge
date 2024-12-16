import { useState } from "react";
import { Link } from "react-router-dom";
import { HamburguerMenuIcon } from "../ui/Icons";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header
            style={{
                animation: "scale 300ms linear",
                animationTimeline: "scroll()",
            }}
            className="sticky h-16 top-4 z-[100] w-[90%] md:w-[70%] mx-auto"
        >
            <nav className="flex items-center justify-between">
                <Link to="/">
                    <img
                        src="https://valuations.atlas.red/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogoREDAtlasLabel.d81b13db.png&w=3840&q=75"
                        alt="Red Atlas Logo"
                        className="w-auto h-10 object-contain"
                    />
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="p-2 rounded-md text-black hover:text-black/40 transition-all duration-150">
                        {isMenuOpen ? (
                            <span className="w-8 h-8 md:w-10 md:h-10 transition-all duration-150">❌</span>
                        ) : (
                            <HamburguerMenuIcon className="w-8 h-8 md:w-10 md:h-10 transition-all duration-150" />
                        )}
                    </button>
                </div>
                <ul
                    className={`${
                        isMenuOpen ? "flex" : "hidden"
                    } absolute md:right-0 top-16 md:top-2 right-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 md:flex gap-3 md:gap-14 text-white items-center font-bold text-lg md:flex-row flex-col md:bg-transparent bg-black/80 md:p-0 p-6 rounded-lg md:w-auto w-full`}
                >
                    <li className="hover:underline transition-all duration-300 scale-100 hover:scale-105">
                        <Link to="/" className="font-outline-1">
                            HOME
                        </Link>
                    </li>
                    <li className="hover:underline transition-all duration-300 scale-100 hover:scale-105">
                        <Link to="/user/properties" className="font-outline-1">
                            MIS PROPIEDADES
                        </Link>
                    </li>
                    <li className="hover:underline transition-all duration-300 scale-100 hover:scale-105">
                        <Link to="/user/properties/create" className="font-outline-1">
                            CREAR PROPIEDAD
                        </Link>
                    </li>
                    <li className="hover:underline transition-all duration-300 scale-100 hover:scale-105">
                        <Link to="/user/properties/favorites" target="_blank" className="font-outline-1">
                            FAVORITOS
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
