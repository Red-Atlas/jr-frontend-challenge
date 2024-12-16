import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Property, SearchParams } from "../types/index";
import { ContentManager } from "../components/ContentManager";
import { Search } from "../components/Search";
import { H1 } from "../ui/Text";
import { getPropertyById } from "../api";

export function FavoritesPage() {
    const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(queryParams.get("page") ?? "1"));
    const [searchParams, setSearchParams] = useState<SearchParams>({
        term: queryParams.get("search") ?? "",
        filter: queryParams.get("filter") ?? "Sin filtro",
        sortBy: (queryParams.get("sortBy") as SearchParams["sortBy"]) ?? undefined,
        status: (queryParams.get("status") as SearchParams["status"]) ?? undefined,
    });
    function propertyIdsFromLocalstorage(): string[] {
        const favoriteProperties: string[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key && key.startsWith("fav-property-")) {
                favoriteProperties.push(localStorage.getItem(key) || "");
            }
        }
        return favoriteProperties;
    }

    useEffect(() => {
        const getFavorites = async () => {
            setLoading(true);
            try {
                const favoriteIds = propertyIdsFromLocalstorage();
                const properties = [];

                for (const id of favoriteIds) {
                    try {
                        const property = await getPropertyById(id);
                        properties.push(property);
                    } catch (err) {
                        console.warn(`Error fetching property with id ${id}`, err);
                    }
                }

                setFavoriteProperties(properties);
            } catch (err) {
                setError("Error fetching favorite properties");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getFavorites();
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
                properties={favoriteProperties}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                totalProperties={favoriteProperties.length}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        </div>
    );
}
