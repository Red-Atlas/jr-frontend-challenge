export interface Location {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: Location;
  address: string;
  images: string[];
  type: string;
  status: string;
  isActive: boolean;
  price: number;
  area: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    name: string;
    contact: string;
  };
}

export interface EditProperty {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  type: string;
  status: string;
  address: string;
  area: number;
  isActive: boolean;
  location: Location;
  createdAt: string;
  updatedAt?: string;
}

export interface PropertyCard extends Omit<Property, 'owner'> {
  onDelete: (deletedProperty: string) => void;
  onUpdate?: (updatedProperty: EditProperty) => void
  createdAt: string;
  updatedAt: string;
  location: Location;
}
