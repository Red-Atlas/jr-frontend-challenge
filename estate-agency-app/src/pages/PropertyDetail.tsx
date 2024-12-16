import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById } from "../services/api";
import { Property } from "../types/property.types";
import PropertyDetailsView from "../components/PropertyDetailsView";
import MapWithMarker from "../components/MapWithMarker";
import "./styles/PropertyDetail.scss";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id!);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    getProperty();
  }, [id]);

  if (!property) {
    return <p>Cargando...</p>;
  }

  const { location, title, address } = property;

  if (!location) {
    return <p>Ubicación no disponible...</p>;
  }

  return (
    <Fragment>
      <div className="container">
        <button className="back-button" onClick={() => navigate("/")}>
          Regresar
        </button>
        <PropertyDetailsView
          property={property}
          onEdit={() => navigate(`/edit-property/${property.id}`)}
        />
        <h2 className="location-heading">Ubicación de la Propiedad</h2>
        <MapWithMarker
          lat={location.lat}
          lng={location.lng}
          title={title}
          address={address}
        />
      </div>
    </Fragment>
  );
};

export default PropertyDetail;
