import React from 'react'
import styles from "./LoginScreen.module.css";
import logo from "../../assets/logo.svg";
import { useAppDispatch } from '../../redux/store/store';
import { login } from '../../redux/feature/authSlice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(login());
  }
  return (
    <div className={styles.login}>
      <div className={`${styles.loginContainer} d-flex flex-column align-items-center rounded-5`}>
        <h2>ViewTube</h2>       
        <img src={logo} alt="Logo" className={styles.logoImg} />
        <button className={`${styles.loginBtn} px-4 py-2 mb-3`} onClick={handleLogin}>Login with Google</button>
        <p>A Youtube clone made using Youtube-API</p>
      </div>
    </div>
  )
}

export default LoginScreen
