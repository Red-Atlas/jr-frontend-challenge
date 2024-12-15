import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import { EditProperty } from "../types";
import { useEditProperty } from "../hooks/useEditProperty";
import Swal from "sweetalert2";

interface EditPropertyModalProps {
  open: boolean;
  onClose: () => void;
  property: EditProperty;
  onUpdate: (updatedProperty: EditProperty) => void;
}

const EditPropertyModal = ({ open, onClose, property, onUpdate }: EditPropertyModalProps) => {
  const { editProperty, loading, error } = useEditProperty();
  const [updatedProperty, setUpdatedProperty] = useState<EditProperty>(property);

  useEffect(() => {
    setUpdatedProperty(property);
  }, [property]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setUpdatedProperty({
      ...updatedProperty,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updated = await editProperty(updatedProperty.id, updatedProperty);
      onUpdate(updated);
      onClose();

      Swal.fire({
        icon: "success",
        title: "Propiedad Actualizada",
        text: "La propiedad ha sido actualizada correctamente.",
      });
    } catch (err) {
      console.error("Error actualizando propiedad:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar la propiedad. Intenta de nuevo.",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Propiedad</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            name="title"
            value={updatedProperty.title}
            onChange={handleInputChange}
            sx={{ margin: "12px 0" }}
          />

          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            name="description"
            value={updatedProperty.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            name="address"
            value={updatedProperty.address}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              name="type"
              value={updatedProperty.type}
              onChange={handleInputChange}
            >
              <MenuItem value="apartment">Apartamento</MenuItem>
              <MenuItem value="house">Casa</MenuItem>
              <MenuItem value="land">Terreno</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              name="status"
              value={updatedProperty.status}
              onChange={handleInputChange}
            >
              <MenuItem value="sale">Venta</MenuItem>
              <MenuItem value="rent">Alquiler</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Precio"
            variant="outlined"
            fullWidth
            type="number"
            name="price"
            value={updatedProperty.price}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Área (m²)"
            variant="outlined"
            fullWidth
            type="number"
            name="area"
            value={updatedProperty.area}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={updatedProperty.isActive}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    isActive: e.target.checked,
                  })
                }
                name="isActive"
              />
            }
            label="Activo"
            sx={{ marginBottom: 2 }}
          />

          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyModal;
