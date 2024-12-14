import { useState } from 'react'
import { DetailsProperty, PropertyFormProps } from '../types/Property'
import Input from './Form/Input'
import Location from './Form/Location'
import Owner from './Form/Owner'
import '../styles/propertyForm.css'
import { saveProperty } from '../services/apiService'
import {
  handleChange,
  handleSelectChange,
  handleCheckboxChange,
  handleLocationChange,
  handleOwnerChange,
  handleSubmit,
} from '../helpers/formHandlers'

function PropertyForm({ property, onSave }: PropertyFormProps): JSX.Element {
  const [formData, setFormData] = useState<DetailsProperty>({
    id: property?.id || Date.now().toString(),
    title: property?.title || '',
    address: property?.address || '',
    description: property?.description || '',
    location: property?.location || { lat: 0, lng: 0 },
    price: property?.price || 0,
    type: property?.type || '',
    status: property?.status || 'available',
    area: property?.area || 0,
    createdAt: property?.createdAt || new Date().toISOString(),
    updatedAt: property?.updatedAt || new Date().toISOString(),
    owner: property?.owner || { name: '', contact: '' },
    isActive: property?.isActive ?? true,
    images: property?.images || [],
  })

  const [error, setError] = useState<string | null>(null)

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, formData, setError, saveProperty, onSave)
      }
      className="propertyForm"
    >
      {error && <p>{error}</p>}

      <Input
        label="Título (obligatorio)"
        id="title"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange(e, setFormData)}
        required
      />
      <Input
        label="Dirección"
        id="address"
        name="address"
        value={formData.address}
        onChange={(e) => handleChange(e, setFormData)}
      />
      <Input
        label="Precio (obligatorio)"
        id="price"
        name="price"
        type="number"
        value={formData.price}
        onChange={(e) => handleChange(e, setFormData)}
        required
      />
      <label htmlFor="type">Tipo (obligatorio)</label>
      <select
        id="type"
        name="type"
        value={formData.type}
        onChange={(e) => handleSelectChange(e, setFormData)}
        required
      >
        <option value="">Seleccionar...</option>
        <option value="apartment">Apartamento</option>
        <option value="house">Casa</option>
        <option value="office">Oficina</option>
        <option value="land">Terreno</option>
      </select>

      <label htmlFor="status">Estado (obligatorio)</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={(e) => handleSelectChange(e, setFormData)}
        required
      >
        <option value="">Seleccionar...</option>
        <option value="sale">Venta</option>
        <option value="rent">Alquiler</option>
      </select>

      <Input
        label="Área"
        id="area"
        name="area"
        type="number"
        value={formData.area}
        onChange={(e) => handleChange(e, setFormData)}
      />
      <Input
        label="Descripción"
        id="description"
        name="description"
        value={formData.description}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <Location
        location={formData.location}
        onChange={(e) => handleLocationChange(e, setFormData)}
      />
      <Owner
        owner={formData.owner}
        onChange={(key, value) => handleOwnerChange(key, value, setFormData)}
      />

      <label htmlFor="isActive">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) => handleCheckboxChange(e, setFormData)}
        />
        Activo
      </label>
      <button type="submit">
        {property ? 'Editar propiedad' : 'Crear propiedad'}
      </button>
    </form>
  )
}

export default PropertyForm
