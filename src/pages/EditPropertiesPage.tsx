import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Property } from "../types";
import { getPropertyById } from "../api";
import PropertyForm from "../components/PropertyForm";
import { SkeletonPropertyForm } from "../components/loaders/SkeletonPropertyForm";
import { HouseBuildingAnimation } from "../components/loaders/HouseBuildingAnimation";

export function EditPropertyPage() {
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const fetchProperty = async () => {
        setLoading(true);
        try {
            const fetchedProperty = await getPropertyById(id as string);
            if (id && fetchedProperty.owner.id !== localStorage.getItem("userId")) {
                navigate(-1);
            }
            setProperty(fetchedProperty);
        } catch (err) {
            setError("Error fetching property");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchProperty();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <SkeletonPropertyForm />;
    if (error) return <HouseBuildingAnimation>{error}</HouseBuildingAnimation>;
    if (!property) return <HouseBuildingAnimation>Property not found</HouseBuildingAnimation>;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 py-8">
            <PropertyForm
                ownerData={{
                    id: property.owner.id ?? "",
                    name: property.owner.name,
                    contact: property.owner.contact,
                }}
                initialProperty={property}
            />
        </div>
    );
}
