import React from "react";
import { Property } from "../types/property.types";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaHome, FaDollarSign } from "react-icons/fa";
import "./styles/PropertyCard.scss";

interface PropertyCardProps {
  property: Property;
}

const trimTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="property-card">
      <div className="property-card__image-wrapper">
        <img
          src={property.images[0]}
          alt={property.title}
          className="property-card__image"
        />
      </div>
      <div className="property-card__content">
        <h2 className="property-card__title">
          {trimTitle(property.title, 25)}
        </h2>
        <p className="property-card__info">
          <FaMapMarkerAlt /> {property.address}
        </p>
        <p className="property-card__info">
          <FaHome /> {property.type}
        </p>
        <p className="property-card__info">
          <FaDollarSign /> {property.price}
        </p>
        <p
          className={`property-card__status ${
            property.isActive ? "active" : "inactive"
          }`}
        >
          {property.isActive ? "Active" : "Inactive"}
        </p>
        <p className="property-card__published">
          Published: {new Date(property.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default PropertyCard;
