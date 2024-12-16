import { useEffect, useState } from 'react'
import { Property } from '../../../Types/property'
import PropertyCard from '../PropertyCard/PropertyCard'
import FilterBar from '../FilterBar/FilterBar'
import { API_URL } from '../../config';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Property[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<Property[]>([])

  useEffect(() => {
    async function fetchFavorites() {
      const response = await fetch(`${API_URL}/properties`);
      const data = await response.json();
      
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        const favs = data.filter((property: Property) => parsedFavorites.includes(property.id));
        setFavorites(favs);
        setFilteredFavorites(favs);
      }
    }
    
    fetchFavorites();
  }, [])

  const handleSearch = (searchQuery: string) => {
    const filtered = favorites.filter(property => 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredFavorites(filtered)
  }

  const handleSort = (sortDirection: 'asc' | 'desc') => {
    const sorted = [...filteredFavorites].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })
    setFilteredFavorites(sorted)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
        Mis Favoritos
      </h1>
      
      <div className="mb-6">
        <FilterBar onSearch={handleSearch} onSort={handleSort} />
      </div>
      
      {filteredFavorites.length === 0 ? (
        <div className="text-center py-6 sm:py-8 lg:py-10">
          <p className="text-gray-600 text-lg sm:text-xl">
            No tienes propiedades guardadas en favoritos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredFavorites.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </div>
  )
}
