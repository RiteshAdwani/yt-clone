import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/feature/authSlice";
import { useAppDispatch } from "../../redux/store/store";
import { useTheme } from "@mui/material";

type SidebarProps = {
  sidebar: boolean;
  handleToggleSidebar: (value: boolean) => void;
};

const Sidebar = ({ sidebar, handleToggleSidebar }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("ytc-access-token");
    sessionStorage.removeItem("ytc-user");
  };
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <nav
      className={`${styles.sidebar} p-2 ${sidebar ? styles.open : ""} ${
        mode === "dark" ? styles.dark : styles.light
      }`}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/" className={styles.sidebarLink}>
        <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
          <HomeIcon />
          <p className={`${styles.sidebarItemName} pt-1 ms-2 mb-0`}>Home</p>
        </div>
      </Link>

      <Link to="/feed/subscriptions" className={styles.sidebarLink}>
        <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
          <SubscriptionsOutlinedIcon className="" />

          <p className={`${styles.sidebarItemName} pt-1 ms-2 mb-0`}>
            Subscriptions
          </p>
        </div>
      </Link>

      <Link to="/feed/liked" className={styles.sidebarLink}>
        <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
          <ThumbUpOffAltIcon />
          <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>
            Liked Videos
          </p>
        </div>
      </Link>

      <hr className="m-0" />

      <div
        className={`${styles.sidebarItem} mb-2 mt-2 d-flex align-items-center`}
      >
        <VideoLibraryOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Library</p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <HistoryOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>History</p>
      </div>

      <hr className="m-0" />

      <div
        className={`${styles.sidebarItem} mb-2 mt-2 d-flex align-items-center`}
      >
        <LibraryMusicOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Music</p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <SportsBasketballOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Sports</p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <SportsEsportsOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Gaming</p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <MovieCreationOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Movies</p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <ArticleOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>News</p>
      </div>

      <hr className="m-0" />

      <div
        className={`${styles.sidebarItem} mt-2 d-flex align-items-center`}
        role="button"
        onClick={handleLogout}
      >
        <LogoutIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Logout</p>
      </div>
    </nav>
  );
};

export default Sidebar;
