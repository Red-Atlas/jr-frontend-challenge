import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { useCreateProperty } from "../hooks/useCreateProperty";
import Swal from "sweetalert2";

const formatDate = (date: Date) => {
  return date.toISOString();
};

const CreatePropertyForm = ({ refetch }: { refetch: () => void }) => {
  const { createProperty, isLoading } = useCreateProperty();

  const [formData, setFormData] = useState({
    address: "",
    title: "",
    description: "",
    location: { lat: 0, lng: 0 },
    images: ["https://picsum.photos/id/1/200/300"],
    type: "apartment",
    status: "sale",
    isActive: true,
    price: 0,
    area: 0,
    owner: { name: "", contact: "" },
    createdAt: formatDate(new Date()),
    updatedAt: "",
  });

  // Función para generar ubicación aleatoria
  const generateRandomLocation = () => {
    const lat = (Math.random() * (90 - (-90)) + (-90)).toFixed(6); // Latitud entre -90 y 90
    const lng = (Math.random() * (180 - (-180)) + (-180)).toFixed(6); // Longitud entre -180 y 180
    setFormData({
      ...formData,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) },
    });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    // Aseguramos que para los campos del propietario (name y contact), actualicemos el objeto 'owner' correctamente
    if (name.startsWith("owner")) {
      const field = name.split(".")[1]; // 'name' o 'contact'
      setFormData({
        ...formData,
        owner: {
          ...formData.owner,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();
    const updatedData = {
      ...formData,
      updatedAt: formatDate(now),
    };

    try {
      await createProperty(updatedData);
      refetch();
      setFormData({
        address: "",
        title: "",
        description: "",
        location: { lat: 0, lng: 0 },
        images: ["https://picsum.photos/id/1/200/300"],
        type: "apartment",
        status: "sale",
        isActive: true,
        price: 0,
        area: 0,
        owner: { name: "", contact: "" },
        createdAt: formatDate(new Date()),
        updatedAt: "",
      });

      Swal.fire({
        icon: "success",
        title: "¡Propiedad creada!",
        text: "La propiedad ha sido creada exitosamente.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#28a745",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear propiedad",
        text: "Hubo un problema con la creación de la propiedad. Intenta de nuevo.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#dc3545",
      });
    }
  };

  return (
    <Box sx={{ margin: "0 auto", overflowY: "auto", maxHeight: "80vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
        Crear Nueva Propiedad
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          name="description"
          value={formData.description}
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
          value={formData.address}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Tipo</InputLabel>
          <Select label="Tipo" name="type" value={formData.type} onChange={handleInputChange}>
            <MenuItem value="apartment">Apartamento</MenuItem>
            <MenuItem value="house">Casa</MenuItem>
            <MenuItem value="land">Terreno</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Estado</InputLabel>
          <Select label="Estado" name="status" value={formData.status} onChange={handleInputChange}>
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
          value={formData.price}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Área (m²)"
          variant="outlined"
          fullWidth
          type="number"
          name="area"
          value={formData.area}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        {/* Datos del propietario */}
        <TextField
          label="Nombre del Propietario"
          variant="outlined"
          fullWidth
          name="owner.name"
          value={formData.owner.name}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Contacto del Propietario"
          variant="outlined"
          fullWidth
          name="owner.contact"
          value={formData.owner.contact}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        {/* Ubicación (Lat y Lng) */}
        <TextField
          label="Latitud"
          variant="outlined"
          fullWidth
          name="location.lat"
          value={formData.location.lat}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Longitud"
          variant="outlined"
          fullWidth
          name="location.lng"
          value={formData.location.lng}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        {/* Mostrar ubicación */}
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Ubicación: Latitud: {formData.location.lat}, Longitud: {formData.location.lng}
        </Typography>

        <Button variant="outlined" onClick={generateRandomLocation} sx={{ marginBottom: 2 }}>
          Generar Ubicación Aleatoria
        </Button>

        <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
          Crear Propiedad
        </Button>
      </form>
    </Box>
  );
};

export default CreatePropertyForm;
