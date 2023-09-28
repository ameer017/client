import React, { useState } from 'react'
import './Header.scss'
import {BiLogIn} from 'react-icons/bi'
import {FaBars, FaTimes, FaUserCircle} from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RESET, logout } from '../../redux/features/auth/authSlice'
// import { UserName } from '../../pages/profile/UpdateProfile'
import { ImTwitter } from 'react-icons/im'
import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink'

const activeLink = ({isActive}) => (isActive ? 'active' : '')
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isIconShowing, setisIconShowing] = useState(false);  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const timesIcon = <FaTimes color='white' size={25} />
  const menuIcon = <FaBars color='white' size={25} />


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const goHome = () => {
        navigate('/')
    }

    const logoutUser = async() => {
        dispatch(RESET());
        await dispatch(logout())
        navigate('/')
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

  return (
    <header className='header'>
        <nav>
            <div className='logo' onClick={goHome}>
                <span>HOMYZ</span>
            </div>

            <div className='--flex-center gap'>
                <nav>
                    <Link to='/create-property' className='bg'>Add Property &nbsp;</Link>
                    <Link to='/properties' className='bg'>Property &nbsp;</Link>
                    <Link to='/contact' className='bg'>Contact &nbsp;</Link>
                    {/* <Link to='/faq' className='bg'>Bookings</Link> */}
                </nav>
            </div>

            <ul className='home-links'>
                <ShowOnLogin>
                    <li className='--flex-center none'>
                        <FaUserCircle size={20}/>
                        {/* <UserName/>&nbsp; */}
                    </li>
                </ShowOnLogin>

                <ShowOnLogout>
                    <li className='none'>
                        <button className='--btn --btn-secondary'>
                            <Link to='/login'>Login</Link>
                        </button>
                    </li>

                </ShowOnLogout>

                <ShowOnLogin>
                    <li className='none'>
                        <NavLink to='/profile' className='activeLink bg'>Profile</NavLink>
                    </li>

                    <li className='none'>
                        <button className='--btn' onClick={logoutUser}>
                            Logout
                        </button>
                    </li>

                </ShowOnLogin>
            </ul>

            <div className="dropdown">
                <div onClick={() => {setisIconShowing((prev) => !prev)}}>
                    
                    <FaBars size={25} color='white' className="dropdown-toggle" onClick={toggleDropdown}/>
                        
                        {isDropdownOpen && (
                        <nav className="dropdown-content">
                            <Link to='/' className='bg'>Home</Link>
                            <hr className='--color-white'/>
                            <Link to='/about' className='bg'>Add Property &nbsp;</Link>
                            <hr className='--color-white'/>
                            <Link to='/about' className='bg'>Property &nbsp;</Link>
                            <hr className='--color-white'/>
                            <Link to='/contact' className='bg'>Contact &nbsp;</Link>
                            <hr className='--color-white'/>
                            <Link to='/faq' className='bg'>Bookings</Link>
                            <hr className='--color-white'/>

                            <ShowOnLogout>
                                <button className='--btn --btn-success'>
                                    <Link to='/login'>Login</Link>
                                </button>
                                <hr className='--color-white'/>
                                <button className='--btn --btn-success'>
                                    <Link to='/register'>Register</Link>
                                </button>
                            
                            </ShowOnLogout>

                            <ShowOnLogin>
                                
                                <NavLink to='/profile' className='bg'>Profile</NavLink>
                                
                                <br/>
                                
                                <button className='--btn --btn-danger' onClick={logoutUser}>
                                    Logout
                                </button>
                            </ShowOnLogin>
                        </nav>
                        )}

                    
                    
                </div>
            </div>
        </nav>
    </header>
    
  )
}

export default Header