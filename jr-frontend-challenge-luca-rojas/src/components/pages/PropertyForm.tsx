import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, CircularProgress, Button, Grid2 as Grid } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { fetchPropertyById } from "../../store/selectedPropertySlice";
import { Property } from "../../interfaces/property.interface";

import FormField from "../form/form_field/FormField";
import LocationFields from "../form/location_field/LocationField";
import OwnerFields from "../form/owner_field/OwnerField";
import FormHeader from "../form/header/FormHeader";
import SelectInput from "../form/select_field/SelectInput";
import { createProperty, updateProperty } from "../../store/actions";

interface PropertyWithIndex extends Partial<Property> {
  [key: string]: any;
}

const MenuItemsAvailable = [
  { name: "Active", value: true },
  { name: "Inactive", value: false },
];

const MenuItemsStatus = [
  { name: "Rent", value: "rent" },
  { name: "Sale", value: "sale" },
];

const MenuItemsType = [
  { name: "House", value: "house" },
  { name: "Land", value: "land" },
  { name: "Office", value: "office" },
  { name: "Apartment", value: "apartment" },
];

const PropertyForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { property, status } = useAppSelector(
    (state) => state.selectedProperty
  );

  const [formData, setFormData] = useState<PropertyWithIndex>({
    address: "",
    title: "",
    description: "",
    location: { lat: 0, lng: 0 },
    type: "",
    status: "",
    isActive: false,
    price: 0,
    area: 0,
    createdAt: "",
    updatedAt: "",
    owner: { name: "", contact: "" },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (property && id) {
      setFormData({
        title: property.title,
        address: property.address,
        description: property.description,
        location: { lat: property.location.lat, lng: property.location.lng },
        images: property.images,
        type: property.type,
        status: property.status,
        isActive: property.isActive,
        price: property.price,
        area: property.area,
        owner: { name: property.owner.name, contact: property.owner.contact },
      });
    }
  }, [property, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");

    setFormData((prevState) => {
      if (nameParts.length === 2) {
        return {
          ...prevState,
          [nameParts[0]]: {
            ...(prevState[nameParts[0]] as Record<string, any>),
            [nameParts[1]]: value,
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleSelectChange = (field: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    
    if (id) {
      const updatedData = { ...formData, updatedAt: currentDate };
      dispatch(updateProperty(id, updatedData));
    } else {
      const newData = {
        ...formData,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      dispatch(createProperty(newData));
    }

    navigate("/properties");
  };

  if (!status) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="86vh"
      >
        <CircularProgress color="error" size="4rem" />
      </Box>
    );
  }

  return (
    <Box>
      <FormHeader id={id} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <FormField
            name="title"
            label="Título"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <FormField
            name="address"
            label="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <FormField
            name="description"
            label="Descripción"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <LocationFields
            location={formData.location}
            onChange={handleChange}
          />
          <SelectInput
            text="Tipo"
            label="Tipo"
            menuItems={MenuItemsType}
            value={formData.type}
            onChange={(value) => handleSelectChange("type", value)}
            required
          />
          <SelectInput
            text="Estado"
            label="Estado"
            menuItems={MenuItemsStatus}
            value={formData.status}
            onChange={(value) => handleSelectChange("status", value)}
          />
          <SelectInput
            text="Disponibilidad"
            label="isActive"
            menuItems={MenuItemsAvailable}
            value={formData.isActive}
            onChange={(value) => handleSelectChange("isActive", value)}
          />
          <FormField
            name="price"
            label="Precio (USD)"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
          <FormField
            name="area"
            label="Área (m²)"
            value={formData.area}
            onChange={handleChange}
            type="number"
          />
          <OwnerFields owner={formData.owner} onChange={handleChange} />
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
            >
              {id ? "Actualizar Propiedad" : "Crear Propiedad"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PropertyForm;
