interface Location {
  lat: number;
  lng: number;
}

interface Owner {
  name: string;
  contact: string;
}

export interface IProperty {
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
  owner: Owner;
}
