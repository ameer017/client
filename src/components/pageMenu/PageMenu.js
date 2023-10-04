import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminAuthorLink } from "../protect/HiddenLink";
import {BiHome} from 'react-icons/bi'
import {BsPersonCheck, BsPeopleFill} from 'react-icons/bs'

const PageMenu = () => {
  const navigate = useNavigate()
  const home = () => {
    navigate('/')
  }
  return (
    <div className="top">
          <BiHome size={25} onClick={home} style={{cursor: 'pointer'}}/>
      <nav className="--btn-primary --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile"><BsPersonCheck size={25}/></NavLink>
          </li>
          <AdminAuthorLink>
            <li>
              <NavLink to="/users"><BsPeopleFill size={25}/></NavLink>
            </li>
            <li>
              <NavLink to="/list-property">properties</NavLink>
            </li>
          </AdminAuthorLink>
          <li>
            <NavLink to="/update-profile">Update Profile</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
