import { useEffect, useState } from 'react';
import { Property } from "../types";

export function useFetchPropertyById(id: string) {
    const [property, setProperty] = useState<Property | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async (): Promise<void> => {
            try {
                const response = await fetch(`https://fake-api-listings.vercel.app/properties/${id}`);
                if (response.ok) {
                    const res: Property = await response.json();
                    setProperty(res);
                } else {
                    console.error(response.statusText);
                    setError(response.statusText);
                }
            } catch (err) {
                console.error(err);
                setError((err as Error).message);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    return { property, error };
}
