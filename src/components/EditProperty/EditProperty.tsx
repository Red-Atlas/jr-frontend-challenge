import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../../../types/property';

export default function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    type: '',
    status: '',
    isActive: false,
    price: 0,
    area: 0,
    'owner.name': '',
    'owner.contact': '',
    image: '',
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        const data = await response.json();
        setProperty(data);
        setFormData({
          title: data.title,
          description: data.description,
          address: data.address,
          type: data.type,
          status: data.status,
          isActive: data.isActive,
          price: data.price,
          area: data.area,
          'owner.name': data.owner.name,
          'owner.contact': data.owner.contact,
          image: data.image,
        });
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          owner: {
            name: formData['owner.name'],
            contact: formData['owner.contact'],
          },
        }),
      });

      if (response.ok) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          navigate(`/details/${id}`);
        }, 2000);
      } else {
        throw new Error('Failed to update property');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Error al actualizar la propiedad');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {showNotification && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out flex items-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <span>Cambios guardados exitosamente</span>
        </div>
      )}

      <button
        onClick={() => navigate(`/details/${id}`)}
        className="mb-3 px-4 py-0 text-gray-600 hover:text-gray-800 flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        ← Volver a detalles
      </button>

      <form onSubmit={handleSubmit} className="max-w-2xl text-black mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Editar Propiedad</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">Título</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                required
                />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">Descripción</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                required
            />
            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                    required
                />
                </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full text-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
                <option value="office">Oficina</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full text-white rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="sale">En Venta</option>
                <option value="rent">En Alquiler</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                required
            />
            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700">Área (sqft)</label>
                <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                    required
                />
                </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">Nombre del Propietario</label>
            <input
                type="text"
                name="owner.name"
                value={formData['owner.name']}
                onChange={handleChange}
                className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                required
            />
            </div>


            <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Contacto del Propietario</label>
                <input
                    type="text"
                    name="owner.contact"
                    value={formData['owner.contact']}
                    onChange={handleChange}
                    className="flex-grow p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-black-800"
                    required
                />
                </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen de la Propiedad</label>
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="Property preview" 
                  className="mt-2 w-full max-h-48 object-cover rounded-md"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-red-50 file:text-red-700
                  hover:file:bg-red-100"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Activo</label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/details/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
