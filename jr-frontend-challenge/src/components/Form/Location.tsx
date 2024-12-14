import Input from './Input'
import { LocationProps } from '../../types/Property'

function LocationForm({ location, onChange }: LocationProps) {
  return (
    <fieldset className="fieldset">
      <legend>Ubicación (obligatoria)</legend>
      <Input
        label="Latitud"
        id="lat"
        name="lat"
        type="number"
        value={location.lat}
        onChange={onChange}
        required
      />
      <Input
        label="Longitud"
        id="lng"
        name="lng"
        type="number"
        value={location.lng}
        onChange={onChange}
        required
      />
    </fieldset>
  )
}

export default LocationForm
