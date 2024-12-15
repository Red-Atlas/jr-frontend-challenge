'use client'

import { useState, useEffect } from 'react'
import PropertyCard from '../PropertyCard/PropertyCard'
import FilterBar from '../FilterBar/FilterBar'
import Pagination from "../Pagination/Pagination"
import { Property, PropertyListingsProps } from '../../../types/property'

const ITEMS_PER_PAGE = 6

declare global {
  interface Window {
    google: any;
  }
}

export default function PropertyListings({ properties }: PropertyListingsProps) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentProperties, setCurrentProperties] = useState<Property[]>([])
  const [isMapView, setIsMapView] = useState(false)
  const [_map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [activeInfoWindow, setActiveInfoWindow] = useState<any>(null)

  useEffect(() => {
    setFilteredProperties(properties)
  }, [properties])

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setCurrentProperties(filteredProperties.slice(startIndex, endIndex))
  }, [filteredProperties, currentPage])

  const createInfoWindowContent = (property: Property) => {
    return `
      <div class="p-2 max-w-[200px]">
        <img src="${property.images[0]}" alt="${property.title}" class="w-full h-32 object-cover mb-2 rounded"/>
        <h3 class="font-bold text-black text-sm">${property.title}</h3>
        <p class="text-sm text-gray-600">${property.address}</p>
        <p class="text-sm font-bold text-blue-600">$${property.price.toLocaleString()}</p>
      </div>
    `;
  };

  useEffect(() => {
    if (isMapView && window.google && filteredProperties.length > 0) {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
      
      const bounds = new window.google.maps.LatLngBounds();

      const mapOptions = {
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      };

      const mapInstance = new window.google.maps.Map(
        document.getElementById('map') as HTMLElement,
        mapOptions
      );

      const newMarkers = filteredProperties.map(property => {
        const position = {
          lat: property.location.lat,
          lng: property.location.lng
        };

        bounds.extend(position);

        const infoWindow = new window.google.maps.InfoWindow({
          content: createInfoWindowContent(property),
          maxWidth: 200
        });

        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: property.title,
          animation: window.google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infoWindow.open(mapInstance, marker);
          setActiveInfoWindow(infoWindow);
        });

        return marker;
      });

      mapInstance.fitBounds(bounds);

      if (newMarkers.length === 1) {
        mapInstance.setZoom(15);
      }

      setMarkers(newMarkers);
      setMap(mapInstance);
    }
  }, [isMapView, filteredProperties]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    const filtered = properties.filter(
      (property: { title: string; address: string }) =>
        property.title.toLowerCase().includes(lowercaseQuery) ||
        property.address.toLowerCase().includes(lowercaseQuery)
    )
    setFilteredProperties(filtered)
    setCurrentPage(1)
  }

  const handleSort = (order: 'asc' | 'desc') => {
    const sorted = [...filteredProperties].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    )
    setFilteredProperties(sorted)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col gap-4 mb-6">
        <FilterBar onSearch={handleSearch} onSort={handleSort} />
        
        <div className="flex items-center gap-2 self-end">
          <span 
            className={`cursor-pointer ${!isMapView ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            onClick={() => setIsMapView(false)}
          >
            Lista
          </span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
              ${isMapView ? 'bg-blue-600' : 'bg-gray-200'}`}
            onClick={() => setIsMapView(!isMapView)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${isMapView ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span 
            className={`cursor-pointer ${isMapView ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            onClick={() => setIsMapView(true)}
          >
            Mapa
          </span>
        </div>
      </div>

      {!isMapView ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div id="map" className="w-full h-[700px] rounded-lg shadow-lg"></div>
      )}
    </div>
  )
}
