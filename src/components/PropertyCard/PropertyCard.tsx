import { Heart, MapPin } from 'lucide-react'
import { PropertyCardProps } from '../../../Types/property'
import { formatDate } from '../../helpers/date'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PropertyCard({ property, onFavorite }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!property) {
    return null;
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== property.id);
    } else {
      newFavorites = [...favorites, property.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    const oppositeFavorite = !isFavorite;
    setIsFavorite(oppositeFavorite);
    onFavorite && onFavorite(property.id, oppositeFavorite);
  };

  return (
    <Link to={`/details/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <img src={property.images[0]} alt={property.title} width={300} height={200} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl text-black font-bold mb-2 h-[60px] line-clamp-2">{property.title}</h2>
          
          <div className="flex items-center justify-center gap-2 mb-2 h-[48px]">
            <MapPin size={18} className="text-gray-600 flex-shrink-0" />
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 line-clamp-2 text-sm"
            >
              {property.address}
            </a>
          </div>

          <div className="flex items-center gap-2 border-t border-black pt-2 mt-4">
            <p className="font-medium min-w-[120px]">Tipo de propiedad:</p>
            <span className="text-sm text-gray-600 capitalize">{property.type}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <p className="font-medium ">Precio:</p>
            <span className="text-black">${property.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <p className="font-medium">Estado:</p>
            <div className="flex gap-2">
              <span className={`text-sm ${property.status === 'sale' ? 'text-green-600' : 'text-blue-600'}`}>
                {property.status === 'sale' ? 'En Venta' : 'En Alquiler'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <p className="font-medium">Área:</p>
            <span className="text-sm text-gray-600">{property.area} sqft</span>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-sm text-gray-600">Publicado: {formatDate(property.createdAt)}</span>
          </div>

          <button
            onClick={handleFavorite}
            className={`w-full mt-2 ${
              isFavorite ? 'bg-gray-600' : 'bg-red-600'
            } text-white hover:bg-red-700 hover:text-white focus:outline-none px-4 py-2 rounded transition-transform transform hover:scale-105 hover:shadow-lg`}
          >
            <Heart 
              className={`inline-block mr-1 ${isFavorite ? 'fill-white' : ''}`} 
              size={18} 
            />
            {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
          </button>
        </div>
      </div>
    </Link>
  )
}
