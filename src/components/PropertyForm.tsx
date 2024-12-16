import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import { PropertyImageUpload } from "./PropertyImageUpload";
import { Property } from "../types";
import { H1, H2, SpanToggle } from "../ui/Text";
import { PropertyMap } from "./PropertyMap";
import { createProperty, updateProperty } from "../api";
import { useNavigate } from "react-router-dom";

const imgbbToken = import.meta.env.VITE_IMGBB_API_KEY;

type CreatePropertyFormProps = {
    ownerData: Property["owner"];
    initialProperty?: Property;
};

export default function PropertyForm({ ownerData, initialProperty }: CreatePropertyFormProps) {
    const [property, setProperty] = useState<Partial<Property>>(
        initialProperty
            ? initialProperty
            : {
                  title: "",
                  description: "",
                  price: 0,
                  area: 0,
                  address: "",
                  status: "sale",
                  type: "house",
                  images: [],
                  location: { lat: -34.6037, lng: -58.3816 },
                  isActive: true,
                  owner: ownerData,
                  createdAt: new Date().toISOString(),
              }
    );

    const translationTypeMap: {
        [key: string]: string;
    } = {
        house: "Casa",
        apartment: "Departamento",
        land: "Terreno",
        office: "Oficina",
    };

    const translationStatusMap: { [key: string]: string } = {
        sale: "Venta",
        rent: "Alquiler",
    };

    const mapRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();

    function validateForm() {
        if (!property.title || property.title.length < 5) {
            alert("El nombre de la propiedad debe tener al menos 5 caracteres.");
            return false;
        }
        if (property.price !== undefined && property.price <= 0) {
            alert("El precio debe ser mayor a 0.");
            return false;
        }
        if (property.area !== undefined && property.area <= 0) {
            alert("La superficie debe ser mayor a 0.");
            return false;
        }
        return true;
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setProperty((prev) => ({
                        ...prev,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    }));
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.log("Geolocation is not available");
        }
    }, []);

    useEffect(() => {
        setProperty((prev) => ({ ...prev, owner: ownerData }));
    }, [ownerData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProperty((prev) => ({ ...prev, [name]: value }));
    };
    const handleSelectChange = (key: string) => (newValue: string) => {
        const translationMap = key === "status" ? translationStatusMap : translationTypeMap;

        setProperty((prev) => ({
            ...prev,
            [key]: Object.keys(translationMap).find((k) => translationMap[k] === newValue) || newValue,
        }));
    };
    const handleImageUpload = async (images: File[]) => {
        const uploadedUrls: string[] = [];

        for (const image of images) {
            const formData = new FormData();
            formData.append("image", image);

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${imgbbToken}`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Error al subir imagen: ${response.statusText}`);
                }

                const data = await response.json();
                if (data && data.data && data.data.url) {
                    uploadedUrls.push(data.data.url);
                } else {
                    throw new Error("No se pudo obtener el enlace de la imagen.");
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
            }
        }

        setProperty((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...uploadedUrls],
        }));
    };

    const handleLocationChange = (lat: number, lng: number) => {
        setProperty((prev) => ({ ...prev, location: { lat, lng } }));
    };

    const handleScrollToMap = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (initialProperty) {
            //Edit
            try {
                await updateProperty(property as Property);
                alert("¡Propiedad editada exitosamente!");
                navigate(`/property/${property.id}`);
            } catch (err) {
                console.error("Error al editar la propiedad:", err);
            }
        } else {
            //Create
            try {
                const createdProperty = await createProperty(property as Property);
                // Since the backend doesn't save the property for more than seconds, we have to save it in the local storage in order to complete the challenge
                const properties = JSON.parse(localStorage.getItem("properties-from-localstorage") || "[]");

                properties.push(createdProperty);
                localStorage.setItem("properties-from-localstorage", JSON.stringify(properties));

                alert("¡Propiedad creada exitosamente!");
                navigate(`/property/${createdProperty.id}`);
            } catch (err) {
                console.error("Error al crear la propiedad:", err);
                alert("Ocurrió un error al intentar crear la propiedad.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto flex flex-col items-center my-20 p-6 md:p-14 rounded-lg shadow-[0_0px_8px_rgba(0,0,0,0.3)]">
            <H1 className="!text-3xl md:!text-4xl text-red-600 mb-14 text-center">{initialProperty ? "Editar Propiedad" : "Crear Nueva Propiedad"}</H1>

            <div className="flex flex-col gap-6">
                <H2 className="!text-2xl mb-2">Información de la propiedad</H2>
                <label className="flex flex-col">
                    Nombre de la propiedad
                    <Input name="title" type="text" placeholder="Nombre de la propiedad" value={property.title} onChange={handleInputChange} required />
                </label>
                <label className="flex flex-col">
                    Precio
                    <Input name="price" type="number" value={property.price} onChange={handleInputChange} required />
                </label>
                <label className="flex flex-col">
                    Superficie en metros cuadrados
                    <Input name="area" type="number" value={property.area} onChange={handleInputChange} required />
                </label>
                <Select options={Object.values(translationStatusMap)} selectedOption={translationStatusMap[property.status || "sale"]} setSelectedOption={handleSelectChange("status")} />
                <Select options={Object.values(translationTypeMap)} selectedOption={translationTypeMap[property.type || "house"]} setSelectedOption={handleSelectChange("type")} />
            </div>

            <textarea
                name="description"
                placeholder="Descripción de la propiedad"
                value={property.description}
                onChange={handleInputChange}
                className="w-full mt-6 p-2 bg-[var(--bg-color)] border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:border-blue-300"
                rows={6}
                maxLength={2000}
                required
            />
            <PropertyImageUpload onImageUpload={handleImageUpload} />

            <div className="flex flex-col items-center mt-6 gap-4 w-full h-full">
                <H2 className="mb-2">Ubicación de la propiedad</H2>
                <Input name="address" type="text" placeholder="Calle 444, Ciudad, Provincia, País" value={property.address} onChange={handleInputChange} required />
                <SpanToggle
                    variant="secondary"
                    className="text-center transition-colors duration-200 ease-linear cursor-pointer shadow-sm shadow-black/30 flex justify-center items-center mt-6 !h-10 !w-[200px] hover:bg-blue-300"
                    onClick={async () => {
                        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${property.address}&format=jsonv2`);
                        const data = await response.json();
                        if (data.length > 0) {
                            handleLocationChange(data[0].lat, data[0].lon);
                            handleScrollToMap();
                        }
                    }}
                >
                    Buscar propiedad en el mapa
                </SpanToggle>
                <div ref={mapRef} className="w-full h-[300px] lg:h-[600px]">
                    {property.location && <PropertyMap location={property.location} onLocationChange={handleLocationChange} />}
                </div>
                <p>Si la ubicación no es correcta, puedes cambiarla en el mapa moviendo el marcador turquesa</p>
            </div>
            <Button type="submit" variant="primary" className="mt-6 w-[200px]">
                Crear Propiedad
            </Button>
        </form>
    );
}
