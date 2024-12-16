import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface PropertyMapProps {
    location: { lat: number; lng: number };
    onLocationChange?: (lat: number, lng: number) => void;
}

export function PropertyMap({ location, onLocationChange }: PropertyMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        if (!map.current) {
            map.current = new mapboxgl.Map({
                accessToken: mapboxToken,
                container: mapContainer.current!,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [location.lng, location.lat],
                zoom: 13,
            });

            marker.current = new mapboxgl.Marker({
                draggable: !!onLocationChange,
            })
                .setLngLat([location.lng, location.lat])
                .addTo(map.current);

            if (onLocationChange) {
                marker.current.on("dragend", () => {
                    const lngLat = marker.current!.getLngLat();
                    onLocationChange(lngLat.lat, lngLat.lng);
                });
            }
        } else {
            map.current.setCenter([location.lng, location.lat]);
            marker.current?.setLngLat([location.lng, location.lat]);
        }
    }, [location, onLocationChange]);

    return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
}
