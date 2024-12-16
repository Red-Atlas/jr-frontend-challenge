export interface Property {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
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
  
  export interface PropertyListingsProps {
    properties: Property[];
  }
  
  export interface PropertyCardProps {
    property: Property;
    onFavorite?: (propertyId: string, isFavorite: boolean) => void;
  }
  
  export interface FilterBarProps {
    onSearch: (query: string) => void;
    onSort: (order: 'asc' | 'desc') => void;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  