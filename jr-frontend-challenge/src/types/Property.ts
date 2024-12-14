export interface DetailsProperty {
    id: string;
    address: string;
    title: string;
    description: string;
    location: {
        lat: number;
        lng: number;
      };
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

export interface CardProperty {
  id: string;
  title: string;
  isActive: boolean;
  images: string[];
  price: number;
  address: string;
  type: string;
  status: string;
  area: number;
  createdAt: string;
}

export interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }

  export interface PropertyFormProps {
    property?: DetailsProperty
    onSave: (property: DetailsProperty) => void
  }

  export interface InputProps {
    label: string
    id: string
    name: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    required?: boolean
  }

  export interface LocationProps {
    location: { lat: number; lng: number }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }

  export interface OwnerProps {
    owner: { name: string; contact: string }
    onChange: (key: 'name' | 'contact', value: string) => void
  }