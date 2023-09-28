import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './Auth.css'
import { RESET, login, sendLoginCode} from '../../redux/features/auth/authSlice'
import { validateEmail } from '../../redux/features/auth/authService'

const initialState = {
    
    email: '',
    password: '',
    
}


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const {email, password} = formData

    const {isLoading, isLoggedIn, isSuccess, message, twoFactor, isError} = useSelector((state) => state.auth)


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
    }

  const loginUser = async(e) => {
    e.preventDefault()

    if(!email || !password) {
      return toast.error("All fields are required")
    }
    if(!validateEmail(email)) {
      return toast.error("Please, add a valid email")
    }

    const userData = {
       email, password
    }
    // console.log(userData)
    await dispatch(login(userData))
  }
  useEffect(() => {
    if(isSuccess, isLoggedIn){
      navigate('/profile')
    }

    if(isError && twoFactor) {
        dispatch(sendLoginCode(email));
        navigate(`/loginWithCode/${email}`); 
    }

    dispatch(RESET())
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email])


  return (
    <div>
        <form className='form__action' >
            <p className="title">Login.</p>

            <div className='flex'>

                <input  value={email} placeholder="yourname@gmail.com" name='email' type="email" className="input" onChange={handleInputChange}/>

                <input  name='password' placeholder="password" type="password" className="input" onChange={handleInputChange} value={password}/>

            </div>
                
            <button className="submit" onClick={loginUser}>Login</button>
            <Link to='/forgot-password'>Forgot password?</Link>
            <div className='row'>
                <Link to='/'>-Home-</Link>
                <p>Don't have an account?</p>
                <Link to='/register'>-Sign Up-</Link>
            </div>
        </form>

    </div>
  )
}

export default Login