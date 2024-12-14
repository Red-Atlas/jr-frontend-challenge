import { useState, useEffect } from 'react';
import { getProperties } from '../services/apiService';
import { CardProperty, DetailsProperty } from '../types/Property';

export function useProperties() {
  const [properties, setProperties] = useState<CardProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<CardProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data: CardProperty[] = await getProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error desconocido al cargar propiedades');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const addProperty = (newProperty: DetailsProperty) => {
    setProperties((prev) => [...prev, newProperty])
    setFilteredProperties((prev) => [...prev, newProperty])
  }

  const filterProperties = (query: string) => {
    if (!query) {
      setFilteredProperties(properties);
    } else {
      const lowercasedQuery = query.toLowerCase();
      setFilteredProperties(
        properties.filter(
          (property) =>
            property.title.toLowerCase().includes(lowercasedQuery) ||
            property.address.toLowerCase().includes(lowercasedQuery)
        )
      );
    }
  };

  const sortPropertiesByPrice = (order: 'asc' | 'desc') => {
    const sorted = [...filteredProperties].sort((a, b) => {
      if (order === 'asc') return a.price - b.price;
      if (order === 'desc') return b.price - a.price;
      return 0;
    });
    setFilteredProperties(sorted);
  };

  return {
    properties,
    filteredProperties,
    loading,
    error,
    addProperty,
    filterProperties,
    sortPropertiesByPrice,
  };
}

