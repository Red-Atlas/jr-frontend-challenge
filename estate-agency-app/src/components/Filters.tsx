import React from "react";
import "./styles/Filters.scss";

interface FiltersProps {
  sortOrder: "asc" | "desc" | null;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc" | null>>;
}

const Filters: React.FC<FiltersProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="filters">
      <button
        className={`filter-button ${sortOrder === "asc" ? "active" : ""}`}
        onClick={() => setSortOrder("asc")}
        disabled={sortOrder === "asc"}
      >
        Ordenar Ascendente
      </button>
      <button
        className={`filter-button ${sortOrder === "desc" ? "active" : ""}`}
        onClick={() => setSortOrder("desc")}
        disabled={sortOrder === "desc"}
      >
        Ordenar Descendente
      </button>
      <button
        className={`filter-button ${sortOrder === null ? "active" : ""}`}
        onClick={() => setSortOrder(null)}
        disabled={sortOrder === null}
      >
        Sin Orden
      </button>
    </div>
  );
};

export default Filters;
