import { useState, useEffect } from "react";
import { IProperty, PropertyStatus } from "../interface/IProperty";
import propertiesData from "../../properties.json";
import LZString from "lz-string";
import { ICreateProperty } from "../interface/ICreateProperty";

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

  let properties: IProperty[] = [];

  const storedProperties = localStorage.getItem("properties");
  if (storedProperties) {
    properties = JSON.parse(LZString.decompress(storedProperties) || "[]");
  } else {
    properties = propertiesData as IProperty[];
  }

  useEffect(() => {
      setTimeout(() => {
        setPropertiesAmount(properties.length);
        const compressedProperties = LZString.compress(
          JSON.stringify(properties)
        );
        localStorage.setItem("properties", compressedProperties);
        setPagination({
          ...pagination,
          totalPages: Math.ceil(properties.length / pagination.limit),
        });
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

  const paginatedProperties = properties.slice(
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
    setPropertiesAmount(properties.length + 1);
    const compressedProperties = LZString.compress(JSON.stringify(properties));
    localStorage.setItem("properties", compressedProperties);
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
  };
};

export default useProperties;
