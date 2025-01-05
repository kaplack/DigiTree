import { createSlice } from "@reduxjs/toolkit";

const drugstoreSlice = createSlice({
  name: "warehouse",
  initialState: [
    { codigo: "00001", nombre: "Almacen Central ESSALUD - SALOG" },
    { codigo: "00002", nombre: "Almacen Hospital Rebagliati" },
  ],
  reducers: {
    addWarehouse: (state, action) => {
      state.push(action.payload);
    },
    removeWarehouse: (state, action) => {
      return state.filter((e) => e.id !== action.payload);
    },
    updateWarehouse: (state, action) => {
      const index = state.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addWarehouse, removeWarehouse, updateWarehouse } =
  drugstoreSlice.actions;
export default drugstoreSlice.reducer;
