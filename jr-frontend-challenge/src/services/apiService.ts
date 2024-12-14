import propertiesData from "../utils/properties.json";
import { DetailsProperty } from "../types/Property";

const LOCAL_STORAGE_KEY = "properties";

const loadFromLocalStorage = (): DetailsProperty[] => {
  const storedProperties = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedProperties ? JSON.parse(storedProperties) : [];
};

const saveToLocalStorage = (properties: DetailsProperty[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(properties));
};

export const isUserCreatedProperty = (propertyId: string): boolean => {
  const storedProperties = loadFromLocalStorage();
  return storedProperties.some((property) => property.id === propertyId);
};


const handleArrayResponse = (data: DetailsProperty[]) => {
  if (!data || data.length === 0) {
    throw new Error("Error en la solicitud: datos no encontrados.");
  }
  return data;
};

const handleObjectResponse = (data: DetailsProperty | undefined) => {
  if (!data) {
    throw new Error("Error en la solicitud: propiedad no encontrada.");
  }
  return data;
};

const getCombinedProperties = (): DetailsProperty[] => {
  const storedProperties = loadFromLocalStorage();
  const combinedMap = new Map();

  propertiesData.forEach((property) => {
    combinedMap.set(property.id, property);
  });

  storedProperties.forEach((property) => {
    combinedMap.set(property.id, property);
  });

  return Array.from(combinedMap.values());
};


// Todas las propiedades
export const getProperties = async (): Promise<DetailsProperty[]> => {
  const combinedProperties = getCombinedProperties();
  return handleArrayResponse(combinedProperties);
};

// Propiedad por ID
export const getPropertyById = async (id: string): Promise<DetailsProperty> => {
  const combinedProperties = getCombinedProperties();
  const property = combinedProperties.find((property: DetailsProperty) => property.id === id);
  return handleObjectResponse(property);
};

// Crear propiedad
export const saveProperty = async (property: DetailsProperty): Promise<void> => {
  const propertiesInMemory = loadFromLocalStorage();
  propertiesInMemory.push(property);
  saveToLocalStorage(propertiesInMemory);
  console.log("Propiedad guardada:", property);
};

// Editar propiedad 
export const editProperty = (updatedProperty: DetailsProperty): Promise<void> => {
  return new Promise((resolve, reject) => {
      try {
          const propertiesInMemory = loadFromLocalStorage();
          const indexInMemory = propertiesInMemory.findIndex((property) => property.id === updatedProperty.id);
          if (indexInMemory !== -1) {
              propertiesInMemory[indexInMemory] = updatedProperty;
              saveToLocalStorage(propertiesInMemory);
          }

          const indexInJson = propertiesData.findIndex((property) => property.id === updatedProperty.id);
          if (indexInJson !== -1) {
              propertiesData[indexInJson] = updatedProperty;
          }

          resolve();
      } catch (error) {
          reject(error);
      }
  });
};
