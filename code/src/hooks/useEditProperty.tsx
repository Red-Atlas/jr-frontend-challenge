import { useState } from "react";
import { EditProperty } from "../types";

const baseUrl = "/api/properties";

export function useEditProperty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editProperty = async (id: string, updatedData: EditProperty) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const res = await response.json();
        return res;
      } else {
        console.error(response.statusText);
        setError(response.statusText);
        throw new Error("Failed to update property");
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editProperty, loading, error };
}
