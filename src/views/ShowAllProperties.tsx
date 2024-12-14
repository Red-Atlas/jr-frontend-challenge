import { useEffect, useState } from "react";
import { Property } from "../types/types";
import { getAllProperties } from "../services/getAllProperties";
import PropertyCard from "../components/cards/PropertyCard";
import Input from "../components/forms/Input";
import "./ShowAllProperties.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PaginationButtons from "../components/pagination/PaginationButtons";

export const ShowAllProperties = () => {
  const [data, setData] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState({
    search: "",
    sort: "",
  });
  const [paginationData, setPaginationData] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredProperties({
      ...filteredProperties,
      search: event.target.value,
    });
  };

  const orderByHigherPrice = () => {
    setFilteredProperties({ ...filteredProperties, sort: "desc" });
  };

  const orderByLowerPrice = () => {
    setFilteredProperties({ ...filteredProperties, sort: "asc" });
  };

  const fetchProperties = async (page: number, limit: number) => {
    try {
      const response = await getAllProperties(page, limit);
      console.log(response);
      setData(response);
      const totalItems = 100;
      const totalPages = Math.ceil(totalItems / limit);
      setPaginationData((prev) => ({ ...prev, totalPages }));
    } catch (error) {
      console.log("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchProperties(paginationData.page, paginationData.limit);
  }, [paginationData.limit, paginationData.page]);

  const processedProperties = data
    .filter(
      (property) =>
        property.title
          .toLowerCase()
          .includes(filteredProperties.search.toLowerCase()) ||
        property.address
          .toLowerCase()
          .includes(filteredProperties.search.toLowerCase())
    )
    .sort((a, b) => {
      if (filteredProperties.sort === "asc") return a.price - b.price;
      if (filteredProperties.sort === "desc") return b.price - a.price;
      return 0;
    });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= paginationData.totalPages) {
      setPaginationData((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <>
      <section className="w-full flex flex-col">
        <Input
          placeholderText="Buscá tu propiedad por nombre o dirección"
          onChangeInput={handleSearchChange}
        />

        <div className="w-full flex flex-col items-end mt-4 ">
          <div className="w-[40%] flex flex-row items-center gap-4 p-6 h-[50px] mr-10  bg-white -mb-8">
            <div className="flex flex-row items-center gap-2 text-red">
              <FaChevronUp />
              <button
                onClick={() => orderByHigherPrice()}
                className="font-semibold"
              >
                Mayor precio
              </button>
            </div>
            <div
              onClick={orderByLowerPrice}
              className="flex flex-row items-center gap-2 text-red"
            >
              <FaChevronDown />
              <button className="font-semibold">Menor precio</button>
            </div>
          </div>
          <div className="grid grid-cols-2 h-auto w-[40%] rounded card-container gap-8 mr-10 mt-20 p-6 shadow-xl ">
            {processedProperties.length > 0 ? (
              processedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <p>
                No se encontraron propiedades que coincidan con tu búsqueda.
              </p>
            )}
            <div className="relative left-[100%]">
              <PaginationButtons
                page={paginationData.page}
                totalPages={paginationData.totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
