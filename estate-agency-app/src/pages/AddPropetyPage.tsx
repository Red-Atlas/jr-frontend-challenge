import React from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../services/api";
import PropertyForm from "../components/PropertyForm";
import Swal from "sweetalert2";
import "./styles/AddPropetyPage.scss";

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data: any) => {
    try {
      const propertyData = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      const response = await createProperty(propertyData);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Propiedad creada exitosamente",
        confirmButtonText: "Aceptar",
      });
      navigate(`/property/${response.id}`);
    } catch (error) {
      console.error("Error al crear la propiedad:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al crear la propiedad",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="container">
      <h1>Agregar Propiedad</h1>
      <PropertyForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddPropertyPage;
