import type { Property, SearchParams } from "../types/index";
import { PropertyCard } from "./cards/PropertyCard";
import { Filters } from "./Filters";
import { Pagination } from "./Pagination";

type ListedPropertiesProps = {
    paginatedProperties: Property[];
    handleSort: (sortBy: SearchParams["sortBy"]) => void;
    handleStatusFilter: (status: SearchParams["status"]) => void;
    loading: boolean;
    page: number;
    setPage: (page: number) => void;
    totalProperties: number;
    searchParams: SearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
    user?: { id: string };
};

export function ListedProperties({ paginatedProperties, handleSort, handleStatusFilter, loading, page, setPage, totalProperties, searchParams, user }: ListedPropertiesProps) {
    function handleIsOwner(property: Property) {
        return property.owner?.id ? property.owner.id.includes(user?.id ?? "") : false;
    }

    return (
        <div style={{ animation: "reveal linear both", animationRange: "entry 10% cover 20%" }} className="flex flex-col gap-10 items-start">
            <Filters handleSort={handleSort} handleStatusFilter={handleStatusFilter} searchParams={searchParams} />
            <div className="flex flex-col gap-4 w-full">
                {paginatedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} isOwner={handleIsOwner(property)} />
                ))}
            </div>
            <Pagination page={page} setPage={setPage as React.Dispatch<React.SetStateAction<number>>} totalProperties={totalProperties} loading={loading} />
        </div>
    );
}
