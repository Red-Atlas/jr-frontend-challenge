import { Property } from '../interfaces/property.interface';
import {
  FETCH_PROPERTIES,
  FETCH_PROPERTY_BY_ID,
  CREATE_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTY,
} from './actions';

export const propertiesReducer = (state: Property[] = [], action: any) => {
  switch (action.type) {
    case FETCH_PROPERTIES:
      return action.payload;
    case CREATE_PROPERTY:
      return [...state, action.payload];
    case UPDATE_PROPERTY:
      return state.map((property) =>
        property.id === action.payload.id ? action.payload : property
      );
    case DELETE_PROPERTY:
      return state.filter((property) => property.id !== action.payload);
    default:
      return state;
  }
};

export const selectedPropertyReducer = (state: Property | null = null, action: any) => {
  switch (action.type) {
    case FETCH_PROPERTY_BY_ID:
      return action.payload;
    default:
      return state;
  }
};