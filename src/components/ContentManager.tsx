import { useState, useEffect } from "react";
import SkeletonPropertyCard from "../components/loaders/SkeletonPropertyCard";
import { HouseBuildingAnimation } from "../components/loaders/HouseBuildingAnimation";
import type { Property, SearchParams } from "../types";
import { ListedProperties } from "./ListedProperties";

type ContentManagerProps = {
    properties: Property[];
    loading: boolean;
    error: string | null;
    page: number;
    setPage: (page: number) => void;
    totalProperties: number;
    searchParams: SearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
    user?: { id: string };
};

export function ContentManager({ properties, loading, error, page, setPage, totalProperties, searchParams, setSearchParams, user }: ContentManagerProps) {
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

    useEffect(() => {
        let result = [...properties];

        // Filter by status (rent or sale)
        if (searchParams.status) {
            result = result.filter((property) => property.status === searchParams.status);
        }

        // Search by name or address
        if (searchParams.term) {
            result = result.filter((property) => property.title.toLowerCase().includes(searchParams.term.toLowerCase()) || property.address.toLowerCase().includes(searchParams.term.toLowerCase()));
        }

        // Sort by price or date
        if (searchParams.sortBy) {
            result.sort((a, b) => {
                switch (searchParams.sortBy) {
                    case "price_asc":
                        return a.price - b.price;
                    case "price_desc":
                        return b.price - a.price;
                    case "date_asc":
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    case "date_desc":
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    default:
                        return 0;
                }
            });
        }

        setFilteredProperties(result);
    }, [properties, searchParams]);

    const handleSort = (sortBy: SearchParams["sortBy"]) => {
        setSearchParams((prev) => ({
            ...prev,
            sortBy: prev.sortBy === sortBy ? undefined : sortBy, // Alternar el filtro
        }));
    };

    const handleStatusFilter = (status: "rent" | "sale") => {
        setSearchParams((prev) => ({
            ...prev,
            status: prev.status === status ? undefined : status, // Alternar el filtro
        }));
    };

    const paginatedProperties = filteredProperties.slice((page - 1) * 10, page * 10);

    const renders = {
        loading: (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonPropertyCard key={index} />
                ))}
            </div>
        ),
        error: <HouseBuildingAnimation>{error}</HouseBuildingAnimation>,
        noProperties: <HouseBuildingAnimation>No hay propiedades para mostrar</HouseBuildingAnimation>,
        propertiesList: (
            <ListedProperties
                paginatedProperties={paginatedProperties}
                handleSort={handleSort}
                handleStatusFilter={handleStatusFilter as (status: SearchParams["status"]) => void}
                loading={loading}
                page={page}
                setPage={setPage}
                totalProperties={totalProperties}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                user={user}
            />
        ),
    };

    return (
        <div className="flex flex-col w-full gap-10 mb-6">
            {loading && renders.loading}
            {error && renders.error}
            {filteredProperties.length === 0 && !loading && renders.noProperties}
            {filteredProperties.length > 0 && renders.propertiesList}
        </div>
    );
}
