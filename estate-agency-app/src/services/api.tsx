const API_BASE_URL = "/api";
import axios from "axios";

export const fetchProperties = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const fetchPropertyById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

export const createProperty = async (propertyData: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/properties`,
      propertyData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw new Error("Error al crear la propiedad");
  }
};

export const updateProperty = async (id: string, propertyData: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/properties/${id}`,
      propertyData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Error al actualizar la propiedad");
  }
};
