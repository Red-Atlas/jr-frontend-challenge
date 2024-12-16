import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Property, SearchParams } from "../types/index";
import { ContentManager } from "../components/ContentManager";
import { getCountTotalProperties, getAllProperties } from "../api";
import { Search } from "../components/Search";
import { H1 } from "../ui/Text";

export function SearchResultsPage() {
    const [allProperties, setAllProperties] = useState<Property[]>([]);
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
            setAllProperties(propertiesData);
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
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchParams({
            term: queryParams.get("search") ?? "",
            filter: queryParams.get("filter") ?? "Sin filtro",
            sortBy: (queryParams.get("sortBy") as SearchParams["sortBy"]) ?? undefined,
            status: (queryParams.get("status") as SearchParams["status"]) ?? undefined,
        });
        setPage(parseInt(queryParams.get("page") ?? "1"));
    }, [location.search]);

    const filteredProperties = useMemo(() => {
        let result = allProperties;

        if (searchParams.term) {
            result = result.filter((property) => {
                if (searchParams.filter === "Título") {
                    return property.title.toLowerCase().includes(searchParams.term.toLowerCase());
                } else if (searchParams.filter === "Dirección") {
                    return property.address.toLowerCase().includes(searchParams.term.toLowerCase());
                } else {
                    return property.title.toLowerCase().includes(searchParams.term.toLowerCase()) || property.address.toLowerCase().includes(searchParams.term.toLowerCase());
                }
            });
        }

        if (searchParams.status) {
            result = result.filter((property) => property.status === searchParams.status);
        }

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

        return result;
    }, [allProperties, searchParams]);

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
                properties={filteredProperties}
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
