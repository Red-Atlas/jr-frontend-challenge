import React from "react";
import { Property } from "../types/property.types";
import "./styles/PropertyDetailsView.scss";

interface PropertyDetailsViewProps {
  property: Property;
  onEdit: () => void;
}

const PropertyDetailsView: React.FC<PropertyDetailsViewProps> = ({
  property,
  onEdit,
}) => {
  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="property-details">
      <div className="property-details-content">
        <div className="property-image">
          <img
            src={property.images[0]}
            alt={property.title}
            className="property-image-img"
          />
        </div>
        <div className="property-info">
          <h1>{property.title}</h1>
          <p className="property-address">Dirección: {property.address}</p>
          <p className="property-price">Precio: ${property.price}</p>
          <p className="property-description">
            Descripción: {property.description}
          </p>
          <p className="property-status">Estado: {property.status}</p>
          <p className="property-type">Tipo: {property.type}</p>
          <p className="property-area">Área: {property.area} m²</p>
          <p className="property-owner">Propietario: {property.owner.name}</p>
          <p className="property-contact">Contacto: {property.owner.contact}</p>
          <p className="property-created-at">
            Fecha de creación: {formatDate(property.createdAt)}
          </p>
          {property.updatedAt && new Date(property.updatedAt).getTime() > 0 && (
            <p className="property-updated-at">
              Fecha de edición: {formatDate(property.updatedAt)}
            </p>
          )}
          <button className="edit-button" onClick={onEdit}>
            Editar Propiedad
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsView;
