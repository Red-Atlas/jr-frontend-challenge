import { Property } from "../types/index";

const baseUrl = "https://fake-api-listings.vercel.app/properties";

/*
Una pequeña aclaración:

Normalmente los datos ya vienen filtrados por query params del lado del backend
asi no hay que traerse toda la base de datos para
saber por ejemplo el orden ascendente de precios o descendente
mis dos opciones al no tener acceso al backend es o traerme todo y trabajarlo desde el frontend
que es perjudicial para el usuario y tambien para el servidor porque estoy pidiento mas data de la que necesito en los request
o la opcion 2 es armarme mi propia api y filtrar todo de ahi, pero como este paso no estaba seguro si era valido o no
ya que al fin y al cabo es un challenge de frontend termine haciendo de la primer forma

*/

export async function getAllProperties() {
    try {
        const response = await fetch(`${baseUrl}?page=1&limit=10000`);
        if (!response.ok) {
            throw new Error(response.statusText + ": Error fetching properties");
        }

        const properties = await response.json();
        return properties;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getCountTotalProperties(): Promise<number> {
    try {
        const response = await fetch(`${baseUrl}/count`);
        if (!response.ok) {
            throw new Error(response.statusText + ": Error fetching total properties count");
        }
        const total = await response.json();
        return total.count;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getPropertyById(id: string): Promise<Property> {
    let returnProperty: Property = {} as Property;
    const properties = JSON.parse(localStorage.getItem("properties-from-localstorage") || "[]");
    const propertyFromLocalStorage = properties.find((property: Property) => property.id === id);

    if (propertyFromLocalStorage) {
        returnProperty = propertyFromLocalStorage;
    } else {
        try {
            //I set it up this way because I know it will crash if the backend eliminated the property as it does frecuently
            const response = await fetch(`${baseUrl}/${id}`);
            if (!response.ok) {
                console.warn(`API call failed with status: ${response.status}`);
                return returnProperty;
            }
            const property = await response.json();
            returnProperty = property;
        } catch (err) {
            console.warn("Error fetching property from API:", err);
            return returnProperty;
        }
    }

    return returnProperty;
}
export async function createProperty(property: Property): Promise<Property> {
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(property),
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}: Error creating property`);
        }

        const createdProperty = await response.json();
        return createdProperty;
    } catch (err) {
        console.error("Error in createProperty:", err);
        throw err;
    }
}

export async function deleteProperty(id: string): Promise<void> {
    try {
        const properties = JSON.parse(localStorage.getItem("properties-from-localstorage") || "[]");
        const updatedProperties = properties.filter((property: Property) => property.id !== id);
        localStorage.setItem("properties-from-localstorage", JSON.stringify(updatedProperties));

        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.warn(`API delete failed with status: ${response.status}`);
            return;
        }
    } catch (err) {
        console.warn("Error deleting property from API:", err);
    }
}

export async function updateProperty(updatedProperty: Property): Promise<Property> {
    const properties = JSON.parse(localStorage.getItem("properties-from-localstorage") || "[]");
    const indexInLocalStorage = properties.findIndex((property: Property) => property.id === updatedProperty.id);

    if (indexInLocalStorage !== -1) {
        properties[indexInLocalStorage] = updatedProperty;
        localStorage.setItem("properties-from-localstorage", JSON.stringify(properties));
    }

    try {
        //I set it up this way because I know it will crash if the backend eliminated the property as it does frecuently
        const response = await fetch(`${baseUrl}/${updatedProperty.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProperty),
        });

        if (!response.ok) {
            console.warn(`API update failed with status: ${response.status}`);

            return updatedProperty;
        }

        const updatedPropertyFromAPI = await response.json();

        if (indexInLocalStorage === -1) {
            properties.push(updatedPropertyFromAPI);
            localStorage.setItem("properties-from-localstorage", JSON.stringify(properties));
        }

        return updatedPropertyFromAPI;
    } catch (err) {
        console.warn("Error updating property in API:", err);
        return updatedProperty;
    }
}
