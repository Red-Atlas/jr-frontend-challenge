import React, { useEffect, useState } from 'react';
import PropertyListings from '../components/PropertyListings/PropertyListings';
import { Property } from '../../Types/property';

const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error al cargar las propiedades:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <PropertyListings properties={properties} />
    </div>
  );
};

export default Home;
