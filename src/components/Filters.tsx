import { useState } from "react";
import type { SearchParams } from "../types";
import { Button } from "../ui/Button";
import { ArrowLeft } from "../ui/Icons";

type FiltersProps = {
    handleSort: (sortBy: SearchParams["sortBy"]) => void;
    handleStatusFilter: (status: SearchParams["status"]) => void;
    searchParams: SearchParams;
};

export function Filters({ handleSort, handleStatusFilter, searchParams }: FiltersProps) {
    const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const buttonsConfig = [
        {
            label: "Precio Ascendente",
            onClick: () => handleSort("price_asc"),
            icon: <ArrowLeft className="p-1 rotate-90" />,
            className: searchParams.sortBy === "price_asc" ? "font-bold" : "",
        },
        {
            label: "Precio Descendente",
            onClick: () => handleSort("price_desc"),
            icon: <ArrowLeft className="p-1 -rotate-90" />,
            className: searchParams.sortBy === "price_desc" ? "font-bold" : "",
        },
        {
            label: "Fecha Ascendente",
            onClick: () => handleSort("date_asc"),
            icon: <ArrowLeft className="p-1 rotate-90" />,
            className: searchParams.sortBy === "date_asc" ? "font-bold" : "",
        },
        {
            label: "Fecha Descendente",
            onClick: () => handleSort("date_desc"),
            icon: <ArrowLeft className="p-1 -rotate-90" />,
            className: searchParams.sortBy === "date_desc" ? "font-bold" : "",
        },
        {
            label: "Alquiler",
            onClick: () => handleStatusFilter("rent"),
            className: searchParams.status === "rent" ? "font-bold" : "",
        },
        {
            label: "Venta",
            onClick: () => handleStatusFilter("sale"),
            className: searchParams.status === "sale" ? "font-bold" : "",
        },
    ];

    return (
        <div className="mt-4 relative">
            {/* Filters for large screens */}
            <div className="hidden lg:flex flex-row justify-end mb-4 gap-2">
                {buttonsConfig.map((button, index) => (
                    <Button key={index} variant="quaternary" onClick={button.onClick} className={`${button.className}`}>
                        {button.label}
                        {button.icon ? button.icon : null}
                    </Button>
                ))}
            </div>

            {/* Filters for small screens */}
            <div className="ml-6 lg:hidden">
                <Button variant="quaternary" onClick={() => setMobileFiltersOpen(!isMobileFiltersOpen)}>
                    Filtros
                    <ArrowLeft className={`${isMobileFiltersOpen ? "rotate-90" : "-rotate-90"} w-5 h-5 p-1`} />
                </Button>

                {isMobileFiltersOpen && (
                    <div className="absolute z-10 left-0 right-0 bg-[var(--bg-color)] shadow-lg rounded-lg mt-2 flex flex-col w-[200px] border-[1px] border-gray-300">
                        {buttonsConfig.map((button, index) => (
                            <Button key={index} variant="quaternary" onClick={button.onClick} className={`${button.className}`}>
                                {button.label}
                                {button.icon ? button.icon : null}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
