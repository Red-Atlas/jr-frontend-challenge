import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Property } from "../types/index";
import { ContentManager } from "../components/ContentManager";
import { Search } from "../components/Search";
import { getAllProperties } from "../api";
import type { SearchParams } from "../types/index";
import { H1 } from "../ui/Text";

export function UserPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
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
    const [userData, setUserData] = useState<{ id: string; name: string; contact: string }>({ id: "", name: "Lucas Calvetti", contact: "l.calvetti.dev@gmail.com" });

    const getLocalProperties = (): Property[] => {
        const localProperties = localStorage.getItem("properties-from-localstorage");
        return localProperties ? JSON.parse(localProperties) : [];
    };

    const mergeProperties = (dbProperties: Property[], localProperties: Property[]): Property[] => {
        const uniqueProperties = new Map<string, Property>();
        dbProperties.forEach((property) => {
            uniqueProperties.set(property.id, property);
        });
        localProperties.forEach((property) => {
            if (!uniqueProperties.has(property.id)) {
                uniqueProperties.set(property.id, property);
            }
        });
        return Array.from(uniqueProperties.values());
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const allProperties = await getAllProperties();

            const filteredProperties = allProperties.filter((property: Property) => property.owner?.id === userData.id);

            const localProperties = getLocalProperties();

            const mergedProperties = mergeProperties(filteredProperties, localProperties);

            setProperties(mergedProperties);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const userIdResponse = await fetch("https://www.uuidtools.com/api/generate/v4");
            const userId = await userIdResponse.json();
            localStorage.setItem("userId", userId[0]);
            setUserData((prev) => ({ ...prev, id: userId[0] }));
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            fetchUserData();
        } else {
            setUserData({ id: userId, name: "UserName", contact: "l.calvetti.dev@gmail.com" });
        }
    }, []);

    useEffect(() => {
        if (!userData.id) return;
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (page !== 1) params.append("page", page.toString());
        if (searchParams.term) params.append("search", searchParams.term);
        if (searchParams.filter !== "Sin filtro") params.append("filter", searchParams.filter);
        if (searchParams.sortBy) params.append("sortBy", searchParams.sortBy);
        if (searchParams.status) params.append("status", searchParams.status);

        navigate(`?${params.toString()}`);
    }, [page, searchParams, navigate]);

    const handleSearch = (newSearchParams: SearchParams) => {
        setSearchParams(newSearchParams);
        setPage(1);
    };

    return (
        <section className="flex flex-col min-h-[100vh] items-center md:w-[65%] mx-auto">
            <H1 className="text-red-500 mt-16 mb-4">Mis propiedades</H1>
            {properties.length > 0 && <Search onSearch={handleSearch} searchParams={searchParams} />}
            <ContentManager
                properties={properties}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                totalProperties={properties.length}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                user={userData}
            />
        </section>
    );
}
