import { useEffect, useState } from "react";
import { Property } from "../types/types";
import { getAllProperties } from "../services/getAllProperties";
import PropertyCard from "../components/cards/PropertyCard";
import Input from "../components/forms/Input";

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
    <div className="flex flex-col mt-20">
      <h2 className="font-bold text-4xl">Todas nuestras propiedades</h2>

      <Input
        onChangeInput={handleSearchChange}
        placeholderText="Busca tu próxima propiedad"
      />

      <div className="mt-10 grid grid-cols-3 gap-6 w-full">
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
