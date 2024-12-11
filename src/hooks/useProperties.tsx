import { useState, useEffect } from "react";
import { IProperty } from "../interface/IProperty";
import { apiService } from "../services/api.service";
import propertiesData from "../../properties.json";
import { notificationService } from "../services/notification.service";

const useProperties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .get<IProperty[]>("properties?page=1&limit=10")
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setProperties(propertiesData as IProperty[]);
        setLoading(false);
        notificationService.error("No se pudieron cargar las propiedades");
      });
  }, []);

  return { properties, loading };
};

export default useProperties;
