import { useEffect, useState } from 'react';
import { Property } from "../types";

const baseUrl = "/api/properties";

export function useFetchProperties(currentPage: number, resultsPerPage: number) {
    const [data, setData] = useState<Property[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async (): Promise<void> => {
            try {
                const response = await fetch(`${baseUrl}?page=${currentPage}&limit=${resultsPerPage}`);
                if (response.ok) {
                    const res: Property[] = await response.json();
                    setData(res);
                } else {
                    console.error(response.statusText);
                    setError(response.statusText);
                }
            } catch (err) {
                console.error(err);
                setError((err as Error).message);
            }
        };

        fetchProperties(); 
    }, [currentPage, resultsPerPage]);

    return { data, error };
}
