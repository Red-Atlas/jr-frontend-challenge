import { useEffect, useState } from "react";
import { Property } from "../types/types";
import { getAllProperties } from "../services/getAllProperties";
import PropertyCard from "../components/cards/PropertyCard";
import Input from "../components/forms/Input";
import WorldMap from "../components/WorldMap";
import "./ShowAllProperties.css";

export const ShowAllProperties = () => {
  const [data, setData] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFilteredProperties(event.target.value);
  };

  const showFilteredProperties = data.filter(
    (property) =>
      property.title.toLowerCase().includes(filteredProperties.toLowerCase()) ||
      property.address
        .toLowerCase()
        .includes(filteredProperties.toLocaleLowerCase())
  );

  //Hook personalizado
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
  {
    /* <h2 className="font-bold text-4xl">Todas nuestras propiedades</h2> */
  }

  return (
    <div className="flex flex-col items-end justify-end  w-full main-content">
      <div className="map-container">
        <WorldMap />
      </div>
      <div className="grid grid-cols-2 h-auto  w-[40%] bg-white rounded card-container gap-6 mt-20 p-6 shadow-xl ">
        {showFilteredProperties.length > 0 ? (
          showFilteredProperties
            .slice(0, 9)
            .map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
        ) : (
          <p>No se encontraron propiedades que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};
