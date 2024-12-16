import { baseURL } from "../environments/baseURL";
import { Property } from "../types/types";
export const updateProperty = async (
  id: string,
  updatedProperty: Partial<Property>
): Promise<Response> => {
  try {
    const response = await fetch(`${baseURL}/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProperty),
    });

    if (!response.ok) {
      const errorBody = await response.text(); // o response.json() si el error viene en formato JSON
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${errorBody}`
      );
    }

    console.log("Property updated successfully");
    return response;
  } catch (error) {
    console.error("Error updating property", error);
    throw error;
  }
};
