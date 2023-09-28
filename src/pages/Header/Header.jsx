import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useHeaderColor from "../../hooks/useHeaderColor";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import { RESET, logout } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();

  const home = () => {
    navigate('/')
  }

  const logoutUser = async () => {
    dispatch(RESET())
    await dispatch(logout())
    navigate('/')
  }

  return (
    <div className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container" >
        {/* logo */}
        <img src="./logo.png" alt="logo" width={100} onClick={home} />

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <Link to='/create-property' className='bg'>Add Property &nbsp;</Link>
            <Link to='/properties' className='bg'>Property &nbsp;</Link>
            <Link to='/contact' className='bg'>Contact &nbsp;</Link>
            {/* <Link to='/faq' className='bg'>Bookings</Link> */}

            <ShowOnLogout>
              <Link to='/login' className="--btn --btn-primary">Sign In</Link>
            </ShowOnLogout>

                <ShowOnLogin>
                        <NavLink to='/profile'>Profile</NavLink>
                    
                        <button className='--btn' onClick={logoutUser}>
                            Sign Out
                        </button>
                    
                </ShowOnLogin>
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default Header;
