import React from "react";
import FormField from "../form_field/FormField";

const OwnerFields: React.FC<{
  owner?: { name: string; contact: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ owner, onChange }) => (
  <>
    <FormField name="owner.name" label="Nombre propietario" value={owner?.name || ""} onChange={onChange} />
    <FormField type="email" name="owner.contact" label="Contacto propietario" value={owner?.contact || ""} onChange={onChange} />
  </>
);

export default OwnerFields;
