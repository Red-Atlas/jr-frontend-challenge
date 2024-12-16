import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchParams } from "../types/index";
import { HeroSection } from "../components/HeroSection";

export function HomePage() {
    const navigate = useNavigate();
    const [searchParams] = useState<SearchParams>({
        term: "",
        filter: "Sin filtro",
        sortBy: undefined,
        status: undefined,
    });

    const handleSearch = (newSearchParams: SearchParams) => {
        const params = new URLSearchParams();
        if (newSearchParams.term) params.append("search", newSearchParams.term);
        if (newSearchParams.filter !== "Sin filtro") params.append("filter", newSearchParams.filter);
        if (newSearchParams.sortBy) params.append("sortBy", newSearchParams.sortBy);
        if (newSearchParams.status) params.append("status", newSearchParams.status);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <section className="relative w-full h-screen">
            <HeroSection searchParams={searchParams} onSearch={handleSearch} />
        </section>
    );
}
