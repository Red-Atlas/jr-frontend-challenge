import { useState, useEffect } from "react";
import { IProperty } from "../interface/IProperty";
import propertiesData from "../../properties.json";
import { notificationService } from "../services/notification.service";

const useProperties = () => {
  const [propertiesByAddress, setPropertiesByAddress] = useState<IProperty[]>(
    []
  );
  const [propertiesByTitle, setPropertiesByTitle] = useState<IProperty[]>([]);
  const [propertiesAmount, setPropertiesAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const properties = propertiesData as IProperty[];

  useEffect(() => {
    try {
      setTimeout(() => {
        setPropertiesAmount(properties.length);
        setPagination({
          ...pagination,
          totalPages: Math.ceil(properties.length / pagination.limit),
        });
        setLoading(false);
      }, 1500);
    } catch {
      notificationService.error("No se pudieron cargar las propiedades");
      setLoading(false);
    }
  }, []);

  const getPropertyById = async (id: string) => {
    return properties?.find((property) => property.id === id);
  };

  const filterPropertiesByAddress = (address: string) => {
    const filteredProperties = properties
      .filter((property) => property.address.includes(address))
      .slice(0, 5);
    setPropertiesByAddress(filteredProperties);
  };

  const filterPropertiesByTitle = (title: string) => {
    const filteredProperties = properties
      .filter((property) => property.title.includes(title))
      .slice(0, 5);
    setPropertiesByTitle(filteredProperties);
  };

  const handleNextPage = () => {
    if (pagination.page <= pagination.totalPages) {
      setPagination({
        ...pagination,
        page: pagination.page + 1,
      });
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination.page - 1,
      });
    }
  };

  const paginatedProperties = properties.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  // const addProperty = (newProperty: IProperty) => {
  //   const updatedProperties = [...properties, newProperty];
  //   setProperties(updatedProperties);
  //   setPropertiesAmount(updatedProperties.length);

  //   // Guardar en el archivo properties.json
  //   const filePath = path.join(__dirname, '../../properties.json');
  //   fs.writeFile(filePath, JSON.stringify(updatedProperties, null, 2), (err) => {
  //     if (err) {
  //       notificationService.error("No se pudo guardar la nueva propiedad");
  //       console.error('Error al escribir el archivo:', err);
  //     } else {
  //       notificationService.success("Propiedad agregada exitosamente");
  //       console.log('Archivo actualizado correctamente.');
  //     }
  //   });
  // };

  return {
    properties: paginatedProperties,
    loading,
    propertiesAmount,
    filterPropertiesByAddress,
    propertiesByAddress,
    filterPropertiesByTitle,
    propertiesByTitle,
    handleNextPage,
    handlePrevPage,
    pagination,
    getPropertyById,
  };
};

export default useProperties;
