import React, { useEffect, useState } from "react";
// import { GrInsecure } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithCode,
  RESET,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import './Auth.css'

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );

  const sendUserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === "") {
      return toast.error("Please fill in login access code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }
    const code = {
      loginCode,
    };
    await dispatch(loginWithCode({ code, email }));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <>
      
      <form onSubmit={loginUserWithCode} className="form__action">
        <h2 className="title">Enter Access Code</h2>
      
        <div className='flex'>
          <input
            type="text"
            placeholder="Access Code"
            required
            name="accessCode"
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
          />
    
          <button type="submit" className="--btn --btn-primary --btn-block">
            Proceed To Login
          </button>
                  
          <span className="--flex-center">
           Check your email for login access code
          </span>
            
          <div className='row'>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p onClick={sendUserLoginCode} className="v-link">
                <b> Resend Code</b>
              </p>
          </div>

        </div>
      </form>
    </>
  );
};

export default LoginWithCode;
