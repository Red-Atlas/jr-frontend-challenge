import { baseURL } from "../environments/baseURL";
import { Property } from "../types/types";

export const createProperty = async (property: Property): Promise<void> => {
  try {
    const response = await fetch(`${baseURL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} : ${response.statusText}`);
    }

    console.log("Property created sucessfully");
  } catch (error) {
    console.error("Error creating property", error);
    throw error;
  }
};
