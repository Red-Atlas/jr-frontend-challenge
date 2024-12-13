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

  return (
    <div className="flex flex-col  w-full main-content">
      {/* <h2 className="font-bold text-4xl">Todas nuestras propiedades</h2> */}

      <div className="map-container">
        <WorldMap />
      </div>

      {/* <Input
        onChangeInput={handleSearchChange}
        placeholderText="Busca tu próxima propiedad"
      /> */}
      <div className="flex items-end justify-end mt-20 ">
        <div className="grid grid-cols-2 gap-6 h-[500px] w-[30%] bg-white ">
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
    </div>
  );
};
