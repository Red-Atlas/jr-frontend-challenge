import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../../../Types/property'; 
import { useEffect, useState } from 'react';
import { formatDate } from '../../helpers/date'; 
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async (id: string) => {
      const response = await fetch(`/api/properties/${id}`); 
      const data = await response.json();
      setProperty(data); 
    };

    if (id) {
      fetchPropertyDetails(id);
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Error al eliminar la propiedad');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al eliminar la propiedad');
    }
    setShowDeleteModal(false);
  };

  if (!property) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>; 
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-3 px-4 py-0 text-gray-600 hover:text-gray-800 flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        ← Volver al inicio
      </button>
      
      <div className="bg-white text-black rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row relative">
        <div className="absolute bottom-0 right-4 flex gap-2 z-10">
          <button 
            onClick={handleEdit}
            className="p-2 text-black-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-600 rounded-full hover:bg-gray-100"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full p-4">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{property.title}</h1>
          <p className="text-base md:text-lg text-gray-600 mb-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                property.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {property.address}
            </a>
          </p>
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="mb-2 sm:mb-0">
              <p className="font-medium">Estado:</p>
              <span
                className={`text-sm ${
                  property.status === 'sale' ? 'text-green-600' : 'text-blue-600'
                }`}
              >
                {property.status === 'sale' ? 'En Venta' : 'En Alquiler'}
              </span>
            </div>
            <span className="text-sm text-gray-500 uppercase">{property.type}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <span className="text-xl font-semibold text-black mb-2 sm:mb-0">
              ${property.price.toLocaleString()}
            </span>
            <div>
              <p className="font-medium">Área:</p>
              <span className="text-sm text-gray-600">{property.area} sqft</span>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-medium">Descripción:</p>
            <p className="text-gray-600">{property.description}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Disponibilidad:</p>
            <span
              className={`text-sm ${
                property.isActive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {property.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              Fecha de Publicación: {formatDate(property.createdAt)}
            </span>
          </div>
          
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-600 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-white text-xl font-bold mb-4">Confirmar eliminación</h2>
            <p className="text-white mb-6">
              ¿Estás seguro que deseas eliminar esta propiedad? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
