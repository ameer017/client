import axios from "axios";

const BACKEND_URL = 'http://localhost:5000';
export const API_URL = `${BACKEND_URL}/api/properties/`;


const createProperty = async (propertyData) => {
  const response = await axios.post(API_URL + "create-property", propertyData);
  return response.data;
};


const getProperty = async () => {
  const response = await axios.get(API_URL + "get-property-data");
  return response.data;
};

const updateProperty = async (propertyData) => {
  const response = await axios.patch(API_URL + "update-property", propertyData);
  return response.data;
};

const reUpdateProperty = async (propertyData) => {
  const response = await axios.put(API_URL + "reset-isBooked/:propertyId", propertyData);
  return response.data;
};


const getProperties = async () => {
  const response = await axios.get(API_URL + "get-properties");
  return response.data;
};


const deleteProperty = async (id) => {
  //   console.log("delete:" + id);
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

// const cancelProperty = async (propertyData) => {
//   const response = await axios.post(API_URL + "upgrade-data", propertyData)
//   return response.data
// }

const propertyService = {
  createProperty,
  getProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  reUpdateProperty,
}

export default propertyService