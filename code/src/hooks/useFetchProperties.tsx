import { useEffect, useState, useCallback } from "react";
import { Property } from "../types";

const baseUrl = "/api/properties";

export function useFetchProperties(currentPage: number, resultsPerPage: number) {
    const [data, setData] = useState<Property[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProperties = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
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
        } finally {
            setLoading(false);
        }
    }, [currentPage, resultsPerPage]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    return { data, error, loading, refetch: fetchProperties };
}
