import { baseURL } from "../environments/baseURL";
import { Property } from "../types/types";

const API_URL = `${baseURL}/properties`;

export const getPropertyByID = async (id: string): Promise<Property> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Property = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};
