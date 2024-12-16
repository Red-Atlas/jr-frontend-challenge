import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchInput } from "../ui/Input";
import { Select } from "../ui/Select";
import type { SearchParams } from "../types/index";

type SearchProps = {
    searchParams: SearchParams;
    onSearch: (searchParams: SearchParams) => void;
};

export function Search({ searchParams, onSearch }: SearchProps) {
    const options = ["Sin filtro", "Título", "Dirección"];
    const [localSearchParams, setLocalSearchParams] = useState(searchParams);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLocalSearchParams(searchParams);
    }, [searchParams]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (localSearchParams.filter !== "Sin filtro" && !localSearchParams.term) {
            alert("Por favor, ingrese un término de búsqueda cuando se selecciona un filtro.");
            return;
        }
        onSearch(localSearchParams);
    };

    const updateURL = (params: SearchParams) => {
        const searchParams = new URLSearchParams(location.search);
        if (params.term) searchParams.set("search", params.term);
        else searchParams.delete("search");
        if (params.filter !== "Sin filtro") searchParams.set("filter", params.filter);
        else searchParams.delete("filter");
        if (params.sortBy) searchParams.set("sortBy", params.sortBy);
        else searchParams.delete("sortBy");
        if (params.status) searchParams.set("status", params.status);
        else searchParams.delete("status");
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = { ...localSearchParams, term: e.target.value };
        setLocalSearchParams(newParams);
        updateURL(newParams);
    };

    const handleSelectChange = (option: string) => {
        const newParams = { ...localSearchParams, filter: option };
        setLocalSearchParams(newParams);
        updateURL(newParams);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start md:gap-2">
            <SearchInput
                placeholder={`Buscar propiedades ${localSearchParams.filter !== "Sin filtro" ? `por ${localSearchParams.filter.toLowerCase()}` : ""}`}
                value={localSearchParams.term}
                onChange={handleInputChange}
            />
            <span className="text-gray-400 text-2xl cursor-default hidden md:block">|</span>
            <Select className="w-32" options={options} selectedOption={localSearchParams.filter} setSelectedOption={handleSelectChange} />
        </form>
    );
}
