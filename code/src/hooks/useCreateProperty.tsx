import { useState } from "react";

const baseUrl = "https://fake-api-listings.vercel.app/properties";

export const useCreateProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const createProperty = async (propertyData: any) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        setSuccess(true);
        return await response.json();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createProperty, isLoading, error, success };
};