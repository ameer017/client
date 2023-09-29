import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import UserList from "./pages/userList/UserList";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./pages/Auth/Register";
import Forgot from "./pages/Auth/ForgotPassword";
import Verify from "./pages/Auth/Verify";
import Login from "./pages/Auth/Login";
import UploadProfile from "./pages/profile/updateProfile";
import AddProperty from "./pages/Auth/AddProperty";
import Residencies from "./pages/Residencies/Residencies";
import BookVisit from "./pages/Auth/BookVisit";
import PropertyList from "./pages/list/Property";
import BookingSuccess from "./pages/sucessPages/BookingSuccess";
import PropertySuccess from "./pages/sucessPages/PropertySuccess";
import LoginWithCode from "./pages/Auth/LoginWithCode";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user, isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/property-success" element={<PropertySuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-property" element={<AddProperty />} />
            <Route path="/list-property" element={<PropertyList />} />
            <Route path="/create-booking" element={<BookVisit />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path='/loginWithCode/:email' element={<LoginWithCode/>}/>
            <Route
              path="/verify/:verificationToken"
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/properties"
              element={
                <Layout>
                  <Residencies />
                </Layout>
              }
            />
            <Route
              path="/update-profile"
              element={
                <Layout>
                  <UploadProfile />
                </Layout>
              }
            />
            <Route
              path="/users"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
