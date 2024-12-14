import { DetailsProperty } from '../types/Property'

export const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<DetailsProperty>>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  export const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFormData: React.Dispatch<React.SetStateAction<DetailsProperty>>
  ) => {
    const { name, value } = e.target
    if (name === 'isActive') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === 'active' ? true : value === 'inactive' ? false : true,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }
  
  export const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<DetailsProperty>>
  ) => {
    const { checked } = e.target
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }))
  }
  
  export const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<DetailsProperty>>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: parseFloat(value) },
    }))
  }
  
  export const handleOwnerChange = (
    key: 'name' | 'contact',
    value: string,
    setFormData: React.Dispatch<React.SetStateAction<DetailsProperty>>
  ) => {
    setFormData((prev) => ({
      ...prev,
      owner: { ...prev.owner, [key]: value },
    }))
  }
  
  export const handleSubmit = async (
    e: React.FormEvent,
    formData: DetailsProperty,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    saveProperty: (property: DetailsProperty) => Promise<void>,
    onSave: (property: DetailsProperty) => void
  ) => {
    e.preventDefault()
  
    if (
      !formData.title ||
      !formData.type ||
      !formData.status ||
      !formData.price ||
      !formData.location.lat ||
      !formData.location.lng
    ) {
      setError('Por favor, completa todos los campos obligatorios.')
      return
    }
  
    setError(null)
    try {
      await saveProperty(formData)
      onSave(formData)
    } catch {
      setError('Error al guardar la propiedad')
    }
  }