import Input from './Input'
import { OwnerProps } from '../../types/Property'

function OwnerForm({ owner, onChange }: OwnerProps) {
  return (
    <fieldset className="fieldset">
      <legend>Propietario</legend>
      <Input
        label="Nombre"
        id="ownerName"
        name="ownerName"
        value={owner.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <Input
        label="Contacto"
        id="ownerContact"
        name="ownerContact"
        value={owner.contact}
        onChange={(e) => onChange('contact', e.target.value)}
      />
    </fieldset>
  )
}

export default OwnerForm
