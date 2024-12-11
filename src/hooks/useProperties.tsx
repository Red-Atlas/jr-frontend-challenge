import { useState, useEffect } from "react";
import { IProperty } from "../interface/IProperty";
import { apiService } from "../services/api.service";
import propertiesData from "../../properties.json";
import { notificationService } from "../services/notification.service";

const useProperties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [propertiesByAddress, setPropertiesByAddress] = useState<IProperty[]>(
    []
  );
  const [propertiesByTitle, setPropertiesByTitle] = useState<IProperty[]>([]);
  const [propertiesAmount, setPropertiesAmount] = useState(0);
  const [allProperties, setAllProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 101,
  });

  useEffect(() => {
    apiService
      .get<IProperty[]>(
        `properties?page=${pagination.page}&limit=${pagination.limit}`
      )
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setProperties(propertiesData as IProperty[]);
        setLoading(false);
        notificationService.error("No se pudieron cargar las propiedades");
      });
  }, [pagination]);

  useEffect(() => {
    (async () => {
      try {
        const limit = 100;
        const allProperties = [];

        for (let page = 1; page <= pagination.totalPages; page++) {
          const data = apiService.get<IProperty[]>(
            `properties?page=${page}&limit=${limit}`
          );
          allProperties.push(data);
        }

        await Promise.all(allProperties).then((data) => {
          const properties = data.flat();
          setPropertiesAmount(properties.length);
          setAllProperties(properties);
        });
      } catch {
        notificationService.error("No se pudieron cargar las propiedades");
      }
    })();
  }, []);

  const filterPropertiesByAddress = (address: string) => {
    const filteredProperties = allProperties
      .filter((property) => property.address.includes(address))
      .slice(0, 5);
    setPropertiesByAddress(filteredProperties);
  };

  const filterPropertiesByTitle = (title: string) => {
    const filteredProperties = allProperties
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

  return {
    properties,
    loading,
    propertiesAmount,
    filterPropertiesByAddress,
    propertiesByAddress,
    filterPropertiesByTitle,
    propertiesByTitle,
    handleNextPage,
    handlePrevPage,
    pagination,
    allProperties,
  };
};

export default useProperties;
