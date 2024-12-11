import { useLayoutEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { IProperty } from "../interface/IProperty";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const useMap = (properties: IProperty[], loading: boolean) => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!loading) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/light-v10",
        center: [properties[0].location.lng, properties[0].location.lat],
        zoom: 9,
      });

      properties.forEach((property) => {
        new mapboxgl.Marker({
          color: "#D31216",
        })
          .setLngLat([property.location.lng, property.location.lat])
          .addTo(map);
      });
    }
  }, [loading, properties]);

  return { mapDiv };
};

export default useMap;
