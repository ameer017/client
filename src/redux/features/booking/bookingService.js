import axios from "axios";

const BACKEND_URL = 'https://realtor-authentication.onrender.com';
export const API_URL = `${BACKEND_URL}/api/bookings/`;


const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL + "create-booking", bookingData);
  return response.data;
};


const getBooking = async () => {
  const response = await axios.get(API_URL + "get-booking-data");
  return response.data;
};

const updateBooking = async (bookingData) => {
  const response = await axios.patch(API_URL + "update-booking", bookingData);
  return response.data;
};


const getBookings = async () => {
  const response = await axios.get(API_URL + "get-bookings");
  return response.data;
};


const deleteBooking = async (id) => {
  //   console.log("delete:" + id);
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

const bookingService = {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking
}

export default bookingService