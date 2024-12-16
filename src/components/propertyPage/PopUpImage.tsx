import { useState } from "react";
import { ArrowLeft } from "../../ui/Icons";
import { Button } from "../../ui/Button";

type PopUpImageProps = {
    images: string[];
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PopUpImage({ images, isExpanded, setIsExpanded }: PopUpImageProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const handleClose = () => setIsExpanded(!isExpanded);
    const handleNext = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const handlePrev = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div>
            {isExpanded && (
                <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 101 }}>
                    <div className="relative w-full h-full flex items-center justify-center p-8" style={{ zIndex: 102 }}>
                        <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} className="w-full h-full object-contain" style={{ zIndex: 103 }} />
                        <Button variant="tertiary" className="absolute bottom-10 !rounded-full !bg-black/60 right-1/2 text-gray-100 text-xl z-[104]">
                            {currentImage + 1}/{images.length}
                        </Button>
                        <button
                            onClick={handleClose}
                            className="absolute top-8 right-16 text-black text-xl transition-all duration-200 ease-linear md:text-4xl cursor-pointer rounded-full hover:bg-gray-300 bg-gray-400 py-1 px-3 md:py-2 md:px-4"
                            style={{ zIndex: 110 }}
                        >
                            X
                        </button>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-black/60" style={{ zIndex: 105 }}>
                            <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl" style={{ zIndex: 106 }}>
                                <ArrowLeft className="w-8 lg:w-28 h-8 lg:h-28 hover:text-black/45 transition-all duration-200 ease-linear" />
                            </button>
                            <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl" style={{ zIndex: 107 }}>
                                <ArrowLeft className="rotate-180 h-8 lg:w-28 w-8 lg:h-28 hover:text-black/45 transition-all duration-200 ease-linear" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
