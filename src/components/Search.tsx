import { useState, FormEvent } from "react";
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (localSearchParams.filter !== "Sin filtro" && !localSearchParams.term) {
            alert("Por favor, ingrese un término de búsqueda cuando se selecciona un filtro.");
            return;
        }
        onSearch(localSearchParams);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchParams((prev) => ({ ...prev, term: e.target.value }));
    };

    const handleSelectChange = (option: string) => {
        setLocalSearchParams((prev) => ({ ...prev, filter: option }));
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
