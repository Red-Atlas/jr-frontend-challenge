import { FunctionComponent } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  location: Location;
  title: string;
}

const MapComponent: FunctionComponent<MapComponentProps> = ({ location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDeGrrX8vGoLru1jtM88kVMO9vWHh2Ong",
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  console.log('Ubicación:', location); 

  return (
    <GoogleMap
      center={location}
      zoom={15}  
      mapContainerStyle={{ width: '100%', height: '300px', marginTop: '16px' }}
    >
      <MarkerF
        position={location}
      />
    </GoogleMap>
  );
};

export default MapComponent;
