import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, forgotPassword } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import './Auth.css'
import { validateEmail } from "../../redux/features/auth/authService";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
  
    const { isLoading } = useSelector((state) => state.auth);
  
    const forgot = async (e) => {
      e.preventDefault();
  
      if (!email) {
        return toast.error("Please enter an email");
      }
  
      if (!validateEmail(email)) {
        return toast.error("Please enter a valid email");
      }
  
      const userData = {
        email,
      };
  
      await dispatch(forgotPassword(userData));
      await dispatch(RESET(userData));
    };
  
    return (
           
        <form onSubmit={forgot} className="form__action">
            <h2 className="title">Forgot Password</h2>
                <div className='flex'>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />
    
                <button type="submit" className="--btn">
                    Get Reset Email
                </button>
              
              <div className='row'>
                <p>
                  <Link to="/">- Home</Link>
                </p>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p>
                  <Link to="/login">- Login</Link>
                </p>
              </div>
                </div>
            </form>
    );
  };
  
  export default Forgot;