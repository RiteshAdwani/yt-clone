import React, { useState } from "react";
import styles from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import logoImg from "../../assets/logo.svg";
import { useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

type HeaderProps = {
  toggleTheme: () => void;
  darkMode: boolean;
  handleToggleSidebar: () => void;
};

const Header = ({
  toggleTheme,
  darkMode,
  handleToggleSidebar,
}: HeaderProps) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const photoURL = useSelector((state: RootState) => state.auth?.user?.photoURL);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      navigate(`/search/${input}`);
    }
  };
  return (
    <div
      className={`${styles.header} ${
        mode === "dark" ? styles.dark : styles.light
      } d-flex align-items-center justify-content-between`}
    >
      <div className={styles.headerLogo}>
        <MenuIcon
          role="button"
          onClick={handleToggleSidebar}
          className="d-block d-sm-none"
        />
        <Link to="/" className={styles.headerLink}>
          <div className="d-flex align-items-center">
            <img src={logoImg} alt="logo" className={styles.logo} />
            <p className="pt-3">ViewTube</p>
          </div>
        </Link>
      </div>

      <form className={styles.searchBarWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className={`${styles.searchBar} py-sm-1 px-2 m-1`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
        />
        <button type="submit" className={styles.searchBtn}>
          <SearchIcon />
        </button>
      </form>

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex me-5" onClick={toggleTheme} role="button">
          <SettingsBrightnessOutlinedIcon />
          <p className={`${styles.darkModeText} ms-2 mb-0`}>
            {" "}
            {darkMode ? "Light" : "Dark"} Mode
          </p>
        </div>

        <img src={photoURL} alt="avatar" className={styles.avatar} />
      </div>
    </div>
  );
};

export default Header;
