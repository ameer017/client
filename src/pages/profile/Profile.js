import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import "./Profile.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import Notification from "../../components/notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  RESET,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader, { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
    role: user?.role,
    isVerified: user?.isVerified,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };


  useLayoutEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        role: user.role,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  return (
    <>
      {/* {!profile.isVerified && <Notification />} */}
      <section>
        <div className="container top">
          <PageMenu />
          <h2>Profile</h2>

          <div className="--flex-center profile">
            {/* <Card cardClass={"card"}> */}
              {isLoading && <Loader />}
              {!isLoading && user && (
                <div className="flex-item">

                  <div className="profile-photo">
                      <div>
                        <img
                          src={imagePreview === null ? user.photo : imagePreview}
                          alt="profilepic"
                        />
                        <h3>Role: {user?.role}</h3>
                      </div>
                  </div>

                  <div className="flex-item">
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile?.email}</p>
                    <p>Phone: {profile?.phone}</p>
                  </div>

                </div>
              )}
            {/* </Card> */}
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);

  const username = user?.name || "...";
  return <p className="--color-white">Hi, {shortenText(username, 10)} |</p>;
};

export default Profile;
