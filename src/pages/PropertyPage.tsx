import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "../types";
import { PropertyImage } from "../components/propertyPage/PropertyImage";
import { PropertyDetails } from "../components/propertyPage/PropertyDetails";
import { PropertyMap } from "../components/PropertyMap";
import { PropertyDescription } from "../components/propertyPage/PropertyDescription";
import { PropertyContact } from "../components/propertyPage/PropertyContact";
import { getPropertyById } from "../api/index";
import { SkeletonPropertyPage } from "../components/loaders/SkeletonPropertyPage";
import { ArrowLeft } from "../ui/Icons";
import { useNavigate } from "react-router-dom";
import { HouseBuildingAnimation } from "../components/loaders/HouseBuildingAnimation";

export const PropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchProperty = async (id: string) => {
        try {
            setLoading(true);
            const data = await getPropertyById(id);
            setProperty(data);
        } catch (error) {
            console.error("Error fetching property:", error);
            setError("Error fetching property");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!id) return;
        const isViewed = localStorage.getItem(`viewed-property-${id}`) === "true";
        if (!isViewed) localStorage.setItem(`viewed-property-${id}`, "true");
        fetchProperty(id);
    }, [id]);

    if (loading) return <SkeletonPropertyPage />;
    if (!property) return <HouseBuildingAnimation>Propiedad no encontrada</HouseBuildingAnimation>;
    if (error) return <div className="text-center py-8">{error}</div>;
    return (
        <main className="container mx-auto px-4 py-8 lg:w-[70%]">
            <PropertyImage images={property.images} title={property.title} />
            <PropertyDetails address={property.address} status={property.status} price={property.price} area={property.area} type={property.type} active={property.isActive} />
            <PropertyMap location={property.location} />
            <PropertyDescription title={property.title} area={property.area} description={property.description} />
            <PropertyContact owner={property.owner} active={property.isActive} />
            <button className="flex gap-2 items-center" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-10 h-10" />
                Volver al listado
            </button>
        </main>
    );
};
