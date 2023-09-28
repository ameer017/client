import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './Auth.css'
import { RESET, register, sendVerificationEmail } from '../../redux/features/auth/authSlice'
import { validateEmail } from '../../redux/features/auth/authService'

const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
}


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const {name, email, password, password2} = formData


    const [passLength, setPassLength] = useState(false)

    const {isLoading, isLoggedIn, isSuccess, message} = useSelector((state) => state.auth)


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
    }

    // Password Strength
  useEffect(() => {
    // Check For password length
    if(password.length > 5) {
        setPassLength(true)
    } else{
        setPassLength(false)
    }
    
  }, [password])

  const registerUser = async (e) => {
    e.preventDefault()

    if(!name || !email || !password ) {
      return toast.error("All fields are required")
    }
    if(password.length < 6) {
      return toast.error("Password must be up to 6 characters")
    }
    if(!validateEmail(email)) {
      return toast.error("Please, add a valid email")
    }
    if(password != password2) {
      return toast.error("Password do not match")
    }


    const userData = {
      name, email, password, password2
    }
    // console.log(userData)
    await dispatch(register(userData))
    await dispatch(sendVerificationEmail())
  };

    useEffect(() => {
        if(isLoggedIn && isSuccess){
          navigate('/profile')
        }
        dispatch(RESET())
    }, [isLoading, isSuccess, dispatch, navigate])


  return (
    <div>
        <form className='form__action' >
            <p className="title">Register.</p>

            <div className='flex'>
                <input  name='name' placeholder="e.g John Doe" type="text" className="input" onChange={handleInputChange} value={name}/>

                <input  value={email} placeholder="yourname@gmail.com" name='email' type="email" className="input" onChange={handleInputChange}/>

                <input  name='password' placeholder="password" type="password" className="input" onChange={handleInputChange} value={password}/>

                <input  name='password2' placeholder="confirm your password" type="password" className="input" onChange={handleInputChange} value={password2} onPaste={(e) => {
                  e.preventDefault()
                  toast.error('cannot paste into input field')
                  return false
                }}/>


            </div>
                
            <button className="submit" onClick={registerUser}>Submit</button>

            <div className='row'>
                <Link to='/'>-Home-</Link>
                <p>Already have an account?</p>
                <Link to='/login'>-Sign In-</Link>
            </div>
        </form>

    </div>
  )
}

export default Register