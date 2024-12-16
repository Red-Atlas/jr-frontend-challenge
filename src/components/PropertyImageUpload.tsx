import { useState, useEffect, useRef } from "react";
import { H2, SpanToggle } from "../ui/Text";
import { TrashIcon } from "../ui/Icons";

interface PropertyImageUploadProps {
    onImageUpload: (images: File[]) => void;
}

export function PropertyImageUpload({ onImageUpload }: PropertyImageUploadProps) {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const maxFileSize = 15 * 1024 * 1024;
    const maxTotalSize = 10 * 1024 * 1024;
    const maxImages = 10;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    useEffect(() => {
        const objectUrls = images.map((image) => URL.createObjectURL(image));
        setPreviews(objectUrls);

        return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    }, [images]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const validFiles = newFiles.filter((file) => validateImage(file));

            if (validFiles.length + images.length > maxImages) {
                setError(`No se pueden cargar más de ${maxImages} imágenes en total.`);
                return;
            }

            const totalSize = [...images, ...validFiles].reduce((sum, img) => sum + img.size, 0);
            if (totalSize > maxTotalSize) {
                setError(`El tamaño total de las imágenes no puede exceder ${maxTotalSize / 1024 / 1024} MB.`);
                return;
            }

            setImages((prevImages) => [...prevImages, ...validFiles]);
            setError(null);
        }
    };

    const validateImage = (file: File): boolean => {
        if (!allowedTypes.includes(file.type)) {
            setError(`Solo se permiten imágenes ${allowedTypes.map((item) => item.replace("image/", "")).join(", ")}.`);
            return false;
        }

        if (file.size > maxFileSize) {
            setError(`El archivo excede el tamaño máximo permitido de ${maxFileSize / 1024 / 1024} MB.`);
            return false;
        }

        return true;
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer?.files;
        if (files) {
            const newFiles = Array.from(files);
            const validFiles = newFiles.filter((file) => validateImage(file));

            if (validFiles.length + images.length > maxImages) {
                setError(`No se pueden cargar más de ${maxImages} imágenes en total.`);
                return;
            }

            const totalSize = [...images, ...validFiles].reduce((sum, img) => sum + img.size, 0);
            if (totalSize > maxTotalSize) {
                setError(`El tamaño total de las imágenes no puede exceder ${maxTotalSize / 1024 / 1024} MB.`);
                return;
            }

            setImages((prevImages) => [...prevImages, ...validFiles]);
            setError(null);
        }
    };

    const resetImages = () => {
        setImages([]);
        setPreviews([]);
        setError(null);
    };

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUploadConfirmation = () => {
        setConfirmed(true);
        onImageUpload(images); // Envía las imágenes seleccionadas al componente padre.
    };

    return (
        <div className="mt-14 mb-32 w-full h-[450px]">
            <H2 className="mb-2 text-center">Imágenes de la propiedad</H2>

            <div
                className={`relative flex flex-col items-center justify-center px-4 lg:px-20 space-y-2 h-full w-full rounded-md border-2 duration-200 border-dashed text-center hover:border-gray-500 transition-colors ${
                    dragging ? "border-blue-300 bg-gray-200" : "border-slate-400/70 bg-transparent"
                } ${error ? "border-red-500" : "border-slate-400/70"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input ref={fileInputRef} id="image-upload" type="file" accept={allowedTypes.join(",")} multiple className="hidden" onChange={handleImageChange} />

                <label
                    htmlFor="image-upload"
                    className={`cursor-pointer w-full h-full max-w-[80%] ${
                        error ? "text-red-500" : "text-gray-400"
                    } hover:text-gray-600 lg:truncate lg:overflow-hidden lg:whitespace-nowrap flex items-center justify-center`}
                >
                    {dragging
                        ? "Suelta tus imágenes aquí"
                        : images.length
                        ? `Imágenes cargadas: ${images.length}/${maxImages}. Haz clic para agregar más.`
                        : error
                        ? error
                        : `Máximo ${maxImages} imágenes, solo se permiten: ${allowedTypes.map((item) => item.replace("image/", "")).join(", ")}`}
                </label>

                {images.length > 0 && !error && (
                    <div className="absolute bottom-4 right-4">
                        <SpanToggle
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                resetImages();
                            }}
                            className="flex items-center space-x-2 rounded-md font-bold bg-gray-300 px-4 py-2 duration-300 hover:text-gray-200 shadow-sm hover:shadow-gray-300 text-gray-800 hover:bg-red-600"
                        >
                            <TrashIcon />
                            <span>Eliminar todo</span>
                        </SpanToggle>
                    </div>
                )}

                {previews.length > 0 && (
                    <div className="absolute top-4 left-4 right-4 bottom-16 overflow-auto grid grid-cols-3 gap-4">
                        {previews.map((preview, index) => (
                            <div key={index} className="relative">
                                <img src={preview} alt={`Property ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                                <SpanToggle
                                    className="absolute cursor-pointer top-1 right-1 transition-colors ease-linear !rounded-md !p-1 bg-gray-300 px-4 duration-300 hover:text-gray-200 shadow-sm hover:shadow-gray-300 text-gray-800 hover:bg-red-600"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        removeImage(index);
                                    }}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </SpanToggle>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {images.length > 0 && (
                <div className="mt-4 flex justify-center">
                    <SpanToggle
                        onClick={handleUploadConfirmation}
                        className={`px-6 text-center py-3 cursor-pointer transition-all duration-500 ease-in-out text-white ${
                            confirmed ? " bg-green-400 hover:bg-green-400 w-[80px]" : "w-[300px] bg-blue-500 rounded-lg hover:bg-blue-600"
                        } `}
                    >
                        {confirmed ? "✔️" : "Confirmar carga de imágenes"}
                    </SpanToggle>
                </div>
            )}
        </div>
    );
}
