import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import medService from "./medService";

const initialState = {
  allMeds: [],
  meds: [],
  med: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create new job
export const createMed = createAsyncThunk(
  "med/create",
  async (medData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await medService.createMed(medData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// //Get user jobs post
// export const getWorks = createAsyncThunk('works/getWorks', async (_, thunkAPI) => {
//     try{
//         const token = thunkAPI.getState().auth.user.token
//         return await workService.getWorks( token)
//     }catch (error){
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// //Get user job
// export const getWork = createAsyncThunk('works/get', async (workId, thunkAPI) => {
//     try{
//         const token = thunkAPI.getState().auth.user.token
//         return await workService.getWork(workId, token)
//     }catch (error){
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// //Get job
// export const getPublicWork = createAsyncThunk('works/getPublic', async (workId, thunkAPI) => {
//     try{
//         const token = thunkAPI.getState().auth.user.token
//         return await workService.getPublicWork(workId, token)
//     }catch (error){
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

//Update med
export const updateMed = createAsyncThunk(
  "med/update",
  async (medData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await medService.updateMed(medData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// //Delete job
// export const deleteWork = createAsyncThunk('works/delete', async ( workId, thunkAPI) => {
//     try{
//         const token = thunkAPI.getState().auth.user.token
//         return await workService.deleteWork( workId, token)
//     }catch (error){
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// //Get all meds
export const getAllMeds = createAsyncThunk(
  "works/getAllMeds",
  async (_, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await medService.getAllMeds();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const medSlice = createSlice({
  name: "med",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.meds = action.payload;
      })
      .addCase(createMed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(getWorks.pending, (state)=>{
      //     state.isLoading = true
      // })
      // .addCase(getWorks.fulfilled, (state, action)=>{
      //     state.isLoading = false
      //     state.isSuccess = true
      //     state.works = action.payload
      // })
      // .addCase(getWorks.rejected, (state, action)=>{
      //     state.isLoading = false
      //     state.isError = true
      //     state.message = action.payload
      // })
      // .addCase(getWork.fulfilled, (state, action)=>{
      //     state.work = action.payload
      // })
      // .addCase(getPublicWork.fulfilled, (state, action)=>{
      //     state.work = action.payload
      // })
      .addCase(getAllMeds.fulfilled, (state, action) => {
        state.allMeds = action.payload;
      });
  },
});

export const { reset } = medSlice.actions;
export default medSlice.reducer;
