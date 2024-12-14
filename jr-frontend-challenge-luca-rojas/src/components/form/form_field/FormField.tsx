import React from "react";
import { TextField, Grid2 as Grid } from "@mui/material";

interface FormFieldProps {
  name: string;
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, value, onChange, type = "text", multiline, rows, required = false }) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      size="small"
      type={type}
      multiline={multiline}
      rows={rows}
      required={required}
    />
  </Grid>
);

export default FormField;
