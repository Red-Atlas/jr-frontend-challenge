import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface MenuItem {
  name: string;
  value: any;
}

interface Props {
  text: string;
  label: string;
  menuItems: Array<MenuItem>;
  onChange?: (value: any) => void;
  value?: any; 
  required?: boolean
}

export default function SelectInput({
  text,
  label,
  menuItems,
  value = "",
  onChange,
  required = false
}: Props) {
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel id="select-input-label">{text}</InputLabel>
      <Select
        labelId="select-input-label"
        id="select-input"
        value={selectedValue}
        label={label}
        onChange={handleChange}
        required={required}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
