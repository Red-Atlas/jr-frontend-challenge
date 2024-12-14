import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPropertyById, editProperty } from '../services/apiService'
import PropertyForm from '../components/PropertyForm'
import { DetailsProperty } from '../types/Property'
import Header from '../components/Header'

function Edit() {
  const { id } = useParams()
  const [property, setProperty] = useState<DetailsProperty | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id!)
        setProperty(data)
      } catch (error) {
        console.error('Error fetching property:', error)
      }
    }
    if (id) fetchProperty()
  }, [id])

  if (!property) return <div>Loading...</div>

  const handleSave = async (updatedProperty: DetailsProperty) => {
    try {
      await editProperty(updatedProperty)
      alert('Propiedad editada con éxito')
      navigate('/')
    } catch (error) {
      console.error('Error al guardar la propiedad:', error)
      alert('Hubo un error al guardar la propiedad')
    }
  }

  return (
    <>
      <Header onFilter={() => {}} />
      <h2 className="titleCreate">Editar Propiedad</h2>
      <PropertyForm property={property} onSave={handleSave} />
    </>
  )
}

export default Edit
