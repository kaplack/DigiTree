import { createSlice } from "@reduxjs/toolkit";

const medicamentosSlice = createSlice({
  name: "medicamentos",
  initialState: [
    { codigo: "7750218001391", nombre: "Dextosec" },
    { codigo: "6957303841899", nombre: "Ugreen usb adapter" },
    { codigo: "4031626710369", nombre: "Hylo-comod" },
    { codigo: "8904102205177", nombre: "CITROFLOW K" },
    { codigo: "8906046202755", nombre: "Digermin" },
    { codigo: "7750215009901", nombre: "Angidex" },
  ],
  reducers: {
    addMedicamento: (state, action) => {
      state.push(action.payload);
    },
    removeMedicamento: (state, action) => {
      return state.filter((e) => e.id !== action.payload);
    },
    updateMedicamento: (state, action) => {
      const index = state.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addMedicamento, removeMedicamento, updateMedicamento } =
  medicamentosSlice.actions;
export default medicamentosSlice.reducer;
