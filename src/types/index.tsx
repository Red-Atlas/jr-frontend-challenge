export type PropertyType = "house" | "apartment" | "land" | "office";
export type PropertyStatus = "rent" | "sale";

export type Location = {
    lat: number;
    lng: number;
};

export type Owner = {
    id?: string;
    name: string;
    contact: string;
};

export type Property = {
    id: string;
    title: string;
    description: string;
    location: Location;
    address: string;
    images: string[];
    type: PropertyType;
    status: PropertyStatus;
    isActive: boolean;
    price: number;
    area: number;
    createdAt: string;
    updatedAt: string;
    owner: Owner;
};

export type SearchParams = {
    term: string;
    filter: string;
    sortBy?: "price_asc" | "price_desc" | "date_asc" | "date_desc";
    status?: "rent" | "sale";
};
