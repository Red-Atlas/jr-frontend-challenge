import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '../interfaces/property.interface';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProperties = createAsyncThunk<Property[]>(
  'properties/fetchProperties',
  async () => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    return response.json();
  }
);

interface PropertiesState {
  items: Property[];
  status: true | false;
  error: string | null;
}

const initialState: PropertiesState = {
  items: [],
  status: false,
  error: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = false;
      })
      .addCase(fetchProperties.fulfilled, (state, action: PayloadAction<Property[]>) => {
        state.status = true;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = true;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default propertiesSlice.reducer;

