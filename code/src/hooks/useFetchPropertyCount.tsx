import { useEffect, useState } from 'react';
const countUrl = '/api/properties/count';

export function useFetchPropertyCount() {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPropertyCount = async (): Promise<void> => {
            try {
                const response = await fetch(countUrl);
                if (response.ok) {
                    const res = await response.json();
                    setCount(res.count);
                } else {
                    console.error(response.statusText);
                    setError(response.statusText);
                }
            } catch (err) {
                console.error(err);
                setError((err as Error).message);
            }
        };

        fetchPropertyCount();
    }, []);

    return { count, error };
}
