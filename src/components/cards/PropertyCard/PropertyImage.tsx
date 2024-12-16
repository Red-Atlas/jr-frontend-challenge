import { Link } from "react-router-dom";
import { Button } from "../../../ui/Button";
import { CameraIcon, CameraOffIcon, HeartIcon } from "../../../ui/Icons";
import { useEffect, useState } from "react";
import { SpanToggle } from "../../../ui/Text";

type PropertyImageProps = {
    id: string;
    title: string;
    images: string[];
};

export function PropertyImage({ id, title, images }: PropertyImageProps) {
    const [isAnimated, setIsAnimated] = useState(false);
    const [isViewed, setIsViewed] = useState(false);

    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (!id) return;
        const favStatus = localStorage.getItem(`fav-property-${id}`) === id;
        const viewedStatus = localStorage.getItem(`viewed-property-${id}`) === id;
        setIsFav(favStatus);
        setIsViewed(viewedStatus);
    }, [id]);

    const toggleFav = () => {
        setIsAnimated(true);
        setTimeout(() => {
            setIsAnimated(false);
        }, 300);
        const newFavStatus = !isFav;
        setIsFav(newFavStatus);
        if (newFavStatus) {
            localStorage.setItem(`fav-property-${id}`, id);
        } else {
            localStorage.removeItem(`fav-property-${id}`);
        }
    };

    return (
        <div className="relative w-full lg:w-[380px] h-[310px] flex-shrink-0">
            <Link to={`/property/${id}`} title={`Ver propiedad: ${title}`} className="block w-full h-full">
                <img src={images[0] ?? "https://via.placeholder.com/800x600"} alt={`Imagen de la propiedad: ${title}`} className="w-full h-full object-cover rounded-l-lg" />
            </Link>
            {isViewed && <SpanToggle className="absolute top-3 left-3 bg-blue-500 text-xs px-2 py-1 text-white">Visto</SpanToggle>}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                <span>{images.length}</span>
                {images.length > 0 ? <CameraIcon className="w-4 h-4" /> : <CameraOffIcon className="w-4 h-4" />}
            </div>
            <Button
                className="absolute top-3 right-3 !p-[6px] border-[1px] border-slate-300 !rounded-full bg-white/80 hover:bg-white hover:border-red-500 duration-500 transition-colors"
                aria-label="Agregar a favoritos"
                onClick={toggleFav}
            >
                <HeartIcon
                    fill={isFav ? "red" : "white"}
                    stroke={isFav ? "red" : "currentColor"}
                    className={`w-5 h-5 ${isAnimated ? "scale-125" : "scale-100"}`}
                    style={{ transition: "all 300ms ease-in-out" }}
                />
            </Button>
        </div>
    );
}
