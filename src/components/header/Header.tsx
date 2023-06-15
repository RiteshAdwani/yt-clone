import React from "react";
import styles from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import logoImg from "../../assets/logo.svg";
import defaultAvatarImg from "../../assets/avatar.png";


type HeaderProps = {
  toggleTheme: () => void;
  darkMode: boolean;
  handleToggleSidebar: () => void;
};

const Header = ({ toggleTheme, darkMode, handleToggleSidebar }: HeaderProps) => {
  return (
    <div
      className={`${styles.header} border border-info d-flex align-items-center justify-content-between`}
    >
      <div className={styles.headerLogo}>
        <MenuIcon role="button" onClick={handleToggleSidebar} className={ styles.menuIcon} />
        <div className="d-flex align-items-center ms-4">
          <img src={logoImg} alt="logo" className={styles.logo} />
          <p className="pt-3">ViewTube</p>
        </div>
      
      </div>
      <form className={styles.searchBarWrapper}>
        <input type="text" placeholder="Search" className={`${styles.searchBar} py-sm-1 px-2 m-1`} />
        <button type="submit" className={styles.searchBtn}>
          <SearchIcon />
        </button>
      </form>

      <div className="d-flex justify-content-between align-items-center">

      <div className="d-flex me-3" onClick={toggleTheme} role="button">
        <SettingsBrightnessOutlinedIcon />
        <p className={`${styles.darkModeText} ms-2 mb-0`}> {darkMode ? "Light" : "Dark"} Mode</p>
      </div>
     
        <img src={defaultAvatarImg} alt="avatar" className={ styles.avatar} />
      </div>
    </div>
  );
};

export default Header;
