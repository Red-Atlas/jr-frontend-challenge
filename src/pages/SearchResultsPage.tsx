import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Property, SearchParams } from "../types/index";
import { ContentManager } from "../components/ContentManager";
import { getCountTotalProperties, getAllProperties } from "../api";
import { Search } from "../components/Search";
import { H1 } from "../ui/Text";

export function SearchResultsPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(queryParams.get("page") ?? "1"));
    const [totalProperties, setTotalProperties] = useState(0);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        term: queryParams.get("search") ?? "",
        filter: queryParams.get("filter") ?? "Sin filtro",
        sortBy: (queryParams.get("sortBy") as SearchParams["sortBy"]) ?? undefined,
        status: (queryParams.get("status") as SearchParams["status"]) ?? undefined,
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const propertiesData = await getAllProperties();
            setProperties(propertiesData);
            const total = await getCountTotalProperties();
            setTotalProperties(total);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.search]);

    const handleSearch = (newSearchParams: SearchParams) => {
        const params = new URLSearchParams();
        if (newSearchParams.term) params.append("search", newSearchParams.term);
        if (newSearchParams.filter !== "Sin filtro") params.append("filter", newSearchParams.filter);
        if (newSearchParams.sortBy) params.append("sortBy", newSearchParams.sortBy);
        if (newSearchParams.status) params.append("status", newSearchParams.status);

        navigate(`/search?${params.toString()}`);
        setSearchParams(newSearchParams);
        setPage(1);
    };

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 py-8">
            <H1 className="text-red-500 text-center my-14">Resultados de búsqueda</H1>
            <Search searchParams={searchParams} onSearch={handleSearch} />
            <ContentManager
                properties={properties}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                totalProperties={totalProperties}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        </div>
    );
}
