import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '../interfaces/property.interface';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLengthProperties = createAsyncThunk<Property[]>(
  'properties/fetchLengthProperties',
  async () => {
    const response = await fetch(`${API_BASE_URL}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    const data = await response.json();
    return data.length;
  }
);

export const fetchProperties = createAsyncThunk<Property[], { page: number, limit: number}>(
  'properties/fetchProperties',
  async ({ page, limit }) => {
    const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);
  
    
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    const data = await response.json();

    return data;
  }
);

interface PropertiesState {
  items: Property[];
  total: number;
  status: true | false;
  error: string | null;
}

const initialState: PropertiesState = {
  items: [],
  total: 0,
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
      .addCase(fetchLengthProperties.fulfilled, (state, action: PayloadAction<any>) => {
        state.total = action.payload
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

