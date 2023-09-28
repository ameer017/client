import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  const { isLoading } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section className="form__action">

        <div className="flex">
          <h2>Account Verification</h2>
          <small>To verify your account, click the button below. </small>
          <br />
          <button onClick={verifyAccount} className="button">
            Verify Account
          </button>
        </div>
    </section>
  );
};

export default Verify;