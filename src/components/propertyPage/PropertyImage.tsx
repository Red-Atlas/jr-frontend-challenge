import { useState } from "react";
import { CameraIcon, ExpandIcon } from "../../ui/Icons";
import { PopUpImage } from "./PopUpImage";

type PropertyImageProps = {
    images: string[];
    title: string;
};

export function PropertyImage({ images, title }: PropertyImageProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <PopUpImage images={images} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className="relative w-full h-[400px] lg:h-[600px]">
                <img src={images[currentImage]} alt={`${title} - Image ${currentImage + 1}`} className={`w-full h-full object-cover rounded-lg`} />
                <button onClick={() => setIsExpanded(true)}>
                    <ExpandIcon className="absolute bottom-4 left-5 w-5 h-4 md:w-10 md:h-10 text-black/80 cursor-pointer md:p-1 rounded-full bg-slate-200 hover:scale-110 duration-300" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-2">
                    <CameraIcon className="w-5 h-5" />
                    <span>
                        {currentImage + 1}/{images.length}
                    </span>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`rounded-full border-[1px] shadow-md duration-300 transition-all shadow-black/50 ${
                                currentImage === index ? "bg-white md:!h-4 md:!w-4 !h-3 !w-3 " : "bg-white/50 !h-2 !w-2 md:!w-3 md:!h-3"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
