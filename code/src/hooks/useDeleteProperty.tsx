import { useState } from "react";

const baseUrl = "https://fake-api-listings.vercel.app/properties";

export function useDeleteProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProperty = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        return true;
      } else {
        console.error(response.statusText);
        setError(response.statusText);
        throw new Error("Failed to delete property");
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProperty, loading, error };
}
