import { useNavigate } from 'react-router-dom'
import PropertyForm from '../components/PropertyForm'
import { DetailsProperty } from '../types/Property'
import Header from '../components/Header'
import { useProperties } from '../hooks/useProperties'
import '../styles/propertyForm.css'

function Create(): JSX.Element {
  const { addProperty } = useProperties()
  const navigate = useNavigate()

  const handleSave = (property: DetailsProperty) => {
    addProperty(property)
    alert('Propiedad guardada correctamente')
    navigate('/')
  }

  return (
    <div>
      <Header onFilter={() => {}} />
      <h2 className="titleCreate">Crear Propiedad</h2>
      <PropertyForm onSave={handleSave} />
    </div>
  )
}

export default Create
