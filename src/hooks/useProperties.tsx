import { useState, useEffect } from "react";
import { IProperty, PropertyStatus } from "../interface/IProperty";
import propertiesData from "../../properties.json";
import LZString from "lz-string";
import { ICreateProperty } from "../interface/ICreateProperty";
import { notificationService } from "../services/notification.service";
import { useNavigate } from "react-router-dom";

const useProperties = () => {
  const [propertiesByAddress, setPropertiesByAddress] = useState<IProperty[]>(
    []
  );
  const [propertiesByTitle, setPropertiesByTitle] = useState<IProperty[]>([]);
  const [propertiesOrder, setPropertiesOrder] = useState(false);
  const [propertiesAmount, setPropertiesAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const navigate = useNavigate();

  let properties: IProperty[] = [];

  const storedProperties = localStorage.getItem("properties");
  if (storedProperties) {
    properties = JSON.parse(LZString.decompress(storedProperties) || "[]");
  } else {
    properties = propertiesData as IProperty[];
  }

  useEffect(() => {
    setPropertiesAmount(properties.length);
  }, [properties]);

  useEffect(() => {
    setTimeout(() => {
      const compressedProperties = LZString.compress(
        JSON.stringify(properties)
      );
      localStorage.setItem("properties", compressedProperties);
      setPagination({
        ...pagination,
        totalPages: Math.ceil(properties.length / pagination.limit),
      });
      setPropertiesAmount(properties.length);
      setLoading(false);
    }, 1500);
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

  const getPropertiesSortedByPrice = (order: boolean) => {
    const sortedProperties = [...properties].sort((a, b) => {
      if (order === false) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return sortedProperties;
  };

  const paginatedProperties = getPropertiesSortedByPrice(
    propertiesOrder
  )?.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  const addProperty = (newProperty: ICreateProperty) => {
    const newPropertyWithId: IProperty = {
      ...newProperty,
      id: (properties.length + 1).toString(),
      location: {
        lat: 18.2208,
        lng: -66.5901,
      },
      images: [],
      isActive: true,
      area: 120,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      owner: {
        contact: "787-123-4567",
        name: "Juan Del Pueblo",
      },
      price: Number(newProperty.price),
      status: newProperty.status as PropertyStatus,
    };
    properties.unshift(newPropertyWithId);
    const compressedProperties = LZString.compress(JSON.stringify(properties));
    localStorage.setItem("properties", compressedProperties);
  };

  const updateProperty = (updatedProperty: Partial<IProperty>) => {
    const propertyIndex = properties.findIndex(
      (property) => property.id === updatedProperty.id
    );
    if (propertyIndex !== -1) {
      const updatedProperties = [...properties];
      updatedProperties[propertyIndex] = {
        ...updatedProperties[propertyIndex],
        ...updatedProperty,
      };
      properties = updatedProperties;
      const compressedProperties = LZString.compress(
        JSON.stringify(updatedProperties)
      );
      localStorage.setItem("properties", compressedProperties);
      notificationService.success("Propiedad Actualizada exitosamente");
      navigate("/");
    } else {
      notificationService.error(`No se encontró la propiedad con el id: ${updatedProperty.id}`);
    }
  };

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
    addProperty,
    setPropertiesAmount,
    setPropertiesOrder,
    propertiesOrder,
    updateProperty,
  };
};

export default useProperties;
