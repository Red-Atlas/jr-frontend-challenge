import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById, updateProperty } from "../services/api";
import PropertyForm from "../components/PropertyForm";
import Swal from "sweetalert2";
import "./styles/AddPropetyPage.scss";

const EditPropertyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<any>(null);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        if (id) {
          const data = await fetchPropertyById(id);

          setDefaultValues({
            ...data,
            updatedAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Error al cargar la propiedad:", error);
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Error al cargar la propiedad",
          confirmButtonText: "Cerrar",
        });
      }
    };

    loadProperty();
  }, [id]);

  const handleFormSubmit = async (data: any) => {
    try {
      const updatedData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      await updateProperty(id!, updatedData);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Propiedad actualizada exitosamente",
        confirmButtonText: "Aceptar",
      });
      navigate(`/property/${id}`);
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al actualizar la propiedad.",
        confirmButtonText: "Cerrar",
      });
    }
  };

  if (!defaultValues) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container">
      <h1>Editar Propiedad</h1>
      <PropertyForm onSubmit={handleFormSubmit} defaultValues={defaultValues} />
    </div>
  );
};

export default EditPropertyPage;
