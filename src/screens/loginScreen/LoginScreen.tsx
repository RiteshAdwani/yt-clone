import React, { useEffect } from "react";
import styles from "./LoginScreen.module.css";
import logo from "../../assets/logo.svg";
import loginIllustration from "../../assets/login-illustration.svg";
import { useAppDispatch } from "../../redux/store/store";
import { login } from "../../redux/feature/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const accessToken = useSelector(
    (state: { auth: { accessToken: string } }) => state.auth.accessToken
  );
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className={`${styles.login} d-flex flex-column flex-md-row`}>
      <img src={loginIllustration} alt="login illustration" className="w-50" />
      <div className="mx-auto">
        <div
          className={`${styles.loginContainer} d-flex flex-column align-items-center justify-content-center rounded-5`}
        >
          <h2>ViewTube</h2>
          <img src={logo} alt="Logo" className={styles.logoImg} />
          <button
            className={`${styles.loginBtn} px-4 py-2 mb-3`}
            onClick={handleLogin}
          >
            Login with Google
          </button>
          <p>A Youtube clone made using Youtube API</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
