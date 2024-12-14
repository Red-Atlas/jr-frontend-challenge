import { Dispatch } from 'redux';
import { Property } from '../interfaces/property.interface';
import { showToast } from '../components/alert/Toast';

export const LENGTH_PROPERTIES = 'LENGTH_PROPERTIES';
export const FETCH_PROPERTIES = 'FETCH_PROPERTIES';
export const FETCH_PROPERTY_BY_ID = 'FETCH_PROPERTY_BY_ID';
export const CREATE_PROPERTY = 'CREATE_PROPERTY';
export const UPDATE_PROPERTY = 'UPDATE_PROPERTY';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createProperty = (propertyData: Partial<Property>) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    const data = await response.json();
    
    dispatch({ type: CREATE_PROPERTY, payload: data });
    showToast("success", "Propiedad creada correctamente.")
  } catch (error) {
    showToast("error", "Ocurrió un error al intentar editar la propiedad.")
  }
};

export const updateProperty = (id: string, propertyData: Partial<Property>) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    const data = await response.json();
    dispatch({ type: UPDATE_PROPERTY, payload: data });
    showToast("success", "Propiedad actualizada correctamente.")
  } catch (error) {
    showToast("error", "Ocurrió un error al intentar editar la propiedad.")
  }
};

export const deleteProperty = (id: string) => async (dispatch: Dispatch) => {
  try {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: DELETE_PROPERTY, payload: id });
  } catch (error) {
    showToast("error", `Error deleting property: ${error}`);
  }
};
