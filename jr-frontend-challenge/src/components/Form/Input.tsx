import { InputProps } from '../../types/Property'

function Input({
  label,
  id,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: InputProps) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default Input
