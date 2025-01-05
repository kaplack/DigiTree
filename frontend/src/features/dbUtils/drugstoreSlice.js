import { createSlice } from "@reduxjs/toolkit";

const drugstoreSlice = createSlice({
  name: "drugstore",
  initialState: [
    {
      codigo: "00011",
      nombre: "Farmacia del Departamento de Cirugía Cabeza Y Cuello",
    },
    { codigo: "00012", nombre: "Farmacia del Departamento De Cardiología" },
    {
      codigo: "00013",
      nombre: "Farmacia del Departamento de Medicina Física y Rehabilitación",
    },
    { codigo: "00014", nombre: "Farmacia del Departamento de Imagenología" },
    {
      codigo: "00015",
      nombre: "Farmacia del Departamento de Anatomía Patológica",
    },
    {
      codigo: "00016",
      nombre: "Farmacia del Departamento de Cirugía Pediátrica",
    },
    {
      codigo: "00017",
      nombre: "Farmacia del Departamento de Obstetricia y Ginecología",
    },
    {
      codigo: "00018",
      nombre: "Farmacia del Departamento de Cirugía General y Digestiva",
    },
    {
      codigo: "00019",
      nombre: "Farmacia del Departamento de Ortopedia y Traumatología",
    },
    { codigo: "00020", nombre: "Farmacia del Departamento de Urología" },
    {
      codigo: "00021",
      nombre: "Farmacia del Departamento de Cirugía de Tórax y Cardiovascular",
    },
    { codigo: "00022", nombre: "Farmacia del Departamento De Neurocirugía" },
    {
      codigo: "00023",
      nombre: "Farmacia del Departamento de Anestesiología y Centro Quirúrgico",
    },
    { codigo: "00024", nombre: "Farmacia del Departamento de Neurología" },
    {
      codigo: "00025",
      nombre: "Farmacia del Departamento de Especialidades Médicas",
    },
    { codigo: "00026", nombre: "Farmacia del Departamento de Hematología" },
    {
      codigo: "00027",
      nombre: "Farmacia del Departamento de Oncología Y Radioterapia",
    },
    { codigo: "00028", nombre: "Farmacia del Departamento De Nefrología" },
    { codigo: "00029", nombre: "Farmacia del Departamento De Salud Mental" },
    {
      codigo: "00030",
      nombre: "Farmacia del Departamento del Aparato Digestivo",
    },
    {
      codigo: "00040",
      nombre: "Farmacia del Departamento De Medicina Interna",
    },
    {
      codigo: "00050",
      nombre: "Farmacia del Departamento De Cuidados Intensivos",
    },
    {
      codigo: "00060",
      nombre: "Farmacia del Departamento de Emergencia Hospital",
    },
  ],
  reducers: {
    addDrugstore: (state, action) => {
      state.push(action.payload);
    },
    removeDrugstore: (state, action) => {
      return state.filter((e) => e.id !== action.payload);
    },
    updateDrugstore: (state, action) => {
      const index = state.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addDrugstore, removeDrugstore, updateDrugstore } =
  drugstoreSlice.actions;
export default drugstoreSlice.reducer;
