import React, { useState } from "react";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const WorldMap: React.FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 21, // Coordenadas iniciales
    latitude: 40,
    zoom: 15, // Nivel de zoom inicial
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        {...viewState}
        initialViewState={{
          longitude: 0, // Centro del mapa
          latitude: 0,
          zoom: 1.5, // Nivel de zoom bajo para mostrar todo el mundo
        }}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11" // Estilo decorativo del mapa
        mapboxAccessToken="pk.eyJ1IjoibGVhbmRyb3NhYnVzMTIzIiwiYSI6ImNtNG5jajh6ZjA2aHAyaXEwZ20wdmo5YWUifQ.LQtjXH401cTiS34Fnnub_w" // Agrega tu token aquí
        minZoom={1} // Zoom mínimo permitido
        maxZoom={5}
        interactive={true}
      >
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
};

export default WorldMap;
