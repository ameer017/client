import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";


const initialState = {
  booking: null,
  bookings: [],
  error: false,
  success: false,
  loading: false,
  message: ""
};


export const createBooking = createAsyncThunk(
  "booking/create-booking",
  async (bookingData, thunkAPI) => {
    try {
      return await bookingService.createBooking(bookingData);
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



export const getBooking = createAsyncThunk(
  "booking/get-booking-data", 
  async (_, thunkAPI) => {
  try {
    return await bookingService.getBooking();
  } catch (error) {
    const message =
      (error.response && error.response.data
     && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const updateBooking = createAsyncThunk(
  "booking/update-booking",
  async (bookingData, thunkAPI) => {
    try {
      return await bookingService.updateBooking(bookingData);
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


export const getBookings = createAsyncThunk(
  "booking/get-bookings",
  async (_, thunkAPI) => {
    try {
      return await bookingService.getBookings();
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

// Delete User
export const deleteBooking = createAsyncThunk(
  "bookings/delete-booking",
  async (id, thunkAPI) => {
    try {
      return await bookingService.deleteBooking(id);
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


const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    RESET: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
    
  },
  extraReducers: (builder) => {
    builder

      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.booking = null;
      })

      .addCase(getBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.booking = action.payload;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })


      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.booking = action.payload;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
  },
});

export const { RESET } = bookingSlice.actions;

export const selectBooking = (state) => state.booking;

export default bookingSlice.reducer;
