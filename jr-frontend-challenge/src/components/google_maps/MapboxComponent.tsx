import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  latitude: number;
  longitude: number;
}

const MapboxMapComponent: React.FC<MapboxMapProps> = ({ latitude, longitude }) => {
  return (
    <Map
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 12,
      }}
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11" 
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" />
    </Map>
  );
};

export default MapboxMapComponent;
