import React from "react";
import FormField from "../form_field/FormField";

const LocationFields: React.FC<{
  location?: { lat: number; lng: number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ location, onChange }) => (
  <>
    <FormField name="location.lat" label="Latitud" value={location?.lat || ""} onChange={onChange} type="number" />
    <FormField name="location.lng" label="Longitud" value={location?.lng || ""} onChange={onChange} type="number" />
  </>
);

export default LocationFields;