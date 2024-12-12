import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Property } from "../interfaces/property.interface";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPropertyById = createAsyncThunk<Property, string>(
  "selectedProperty/fetchPropertyById",
  async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }
    return response.json();
  }
);

interface SelectedPropertyState {
  property: Property | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SelectedPropertyState = {
  property: null,
  status: "idle",
  error: null,
};

const selectedPropertySlice = createSlice({
  name: "selectedProperty",
  initialState,
  reducers: {
    clearSelectedProperty: (state) => {
      state.property = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPropertyById.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.status = "succeeded";
          state.property = action.payload;
        }
      )
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { clearSelectedProperty } = selectedPropertySlice.actions;
export default selectedPropertySlice.reducer;
