import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transfService from "./transfService";

const initialState = {
  transfers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create new trasnf
export const createTranfer = createAsyncThunk(
  "transfer/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transfService.createTransfer(data, token);
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
export const updateTransfer = createAsyncThunk(
  "transfer/update",
  async (medData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await transfService.updateTransfer(medData, token);
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
export const getTransfer = createAsyncThunk(
  "transfer/getTransfer",
  async (_, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await transfService.getTransfer();
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

export const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTranfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTranfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transfers = action.payload;
      })
      .addCase(createTranfer.rejected, (state, action) => {
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
      .addCase(getTransfer.fulfilled, (state, action) => {
        state.transfers = action.payload;
      });
  },
});

export const { reset } = transferSlice.actions;
export default transferSlice.reducer;
