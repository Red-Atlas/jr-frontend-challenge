import { useEffect, useState } from "react";
import { Property } from "../types/types";
import { getAllProperties } from "../services/getAllProperties";
import PropertyCard from "../components/cards/PropertyCard";
import Input from "../components/forms/Input";
import "./ShowAllProperties.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const ShowAllProperties = () => {
  const [data, setData] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState({
    search: "",
    sort: "",
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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

  const fetchProperties = async () => {
    const getProperties = await getAllProperties();

    try {
      setData(getProperties);
      console.log(getProperties);
    } catch (error) {
      console.log("Ocurrio un error al obtener los datos", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

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

  return (
    <>
      <section className="w-full flex flex-col">
        <Input
          placeholderText="Buscá tu propiedad por nombre o dirección"
          onChangeInput={handleSearchChange}
        />

        <div className="w-full flex flex-col items-end mt-4 ">
          <div className="w-[40%] flex flex-row items-center gap-4 p-6 h-[50px] bg-white -mb-8">
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
            </div>{" "}
          </div>
          <div className="grid grid-cols-2 h-auto w-[40%] rounded card-container gap-6 mt-20 p-6 shadow-xl ">
            {processedProperties.length > 0 ? (
              processedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <p>
                No se encontraron propiedades que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
