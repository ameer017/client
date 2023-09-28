import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminAuthorLink } from "../protect/HiddenLink";
import {BiHome} from 'react-icons/bi'

const PageMenu = () => {
  const navigate = useNavigate()
  const home = () => {
    navigate('/')
  }
  return (
    <div className="top">
      <nav className="--btn-google --p --mb">
        <ul className="home-links">
          <BiHome size={25} onClick={home}/>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <AdminAuthorLink>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/list-property">Properties</NavLink>
            </li>
            {/* <li>
              <NavLink to="/list-booking">Bookings</NavLink>
            </li> */}
          </AdminAuthorLink>
          <li>
            <NavLink to="/update-profile">Update Profile</NavLink>
          </li>
          <li>
            <NavLink to="/change-password">Change Password</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
