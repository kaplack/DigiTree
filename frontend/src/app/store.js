import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import medReducer from "../features/med/medSlice";
import drugstoreReducer from "../features/dbUtils/drugstoreSlice";
import warehouseReducer from "../features/dbUtils/warehouseSlice";
import medicamentoReducer from "../features/dbUtils/medicamentos";
import transferReducer from "../features/transfer/transfSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    med: medReducer,
    drugstore: drugstoreReducer,
    warehouse: warehouseReducer,
    medicamento: medicamentoReducer,
    transfers: transferReducer,
  },
});
