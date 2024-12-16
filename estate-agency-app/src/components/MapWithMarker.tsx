import { useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import "./styles/MapWithMarker .scss";

interface MapWithMarkerProps {
  lat: number;
  lng: number;
  title: string;
  address: string;
}

const MapWithMarker = ({ lat, lng, title, address }: MapWithMarkerProps) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleActiveMarker = (markerId: number) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  if (!isLoaded) {
    return <p className="map-loading-text">Cargando mapa...</p>;
  }

  const mapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
  };

  return (
    <div className="map-container">
      <GoogleMap
        options={mapOptions}
        center={{ lat, lng }}
        zoom={15}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <MarkerF position={{ lat, lng }} onClick={() => handleActiveMarker(1)}>
          {activeMarker === 1 && (
            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
              <div className="marker-info">
                <p>{title}</p>
                <p>{address}</p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      </GoogleMap>
    </div>
  );
};

export default MapWithMarker;
