import React from "react";
// import { Link } from "react-router-dom";
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

type SidebarProps = {
  sidebar: boolean;
};

const Sidebar = ({sidebar} : SidebarProps) => {
  return (
    <nav
      className={`${styles.sidebar} p-2 ${sidebar ? styles.open : ""}`}
    >
      {/* <Link to="/" className="logo-link text-decoration-none"> */}
      <div
        className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}
      >
        <HomeIcon />
        <p className={`${styles.sidebarItemName} pt-1 ms-2 mb-0`}>Home</p>
      </div>
      {/* </Link> */}
      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <SubscriptionsOutlinedIcon className="" />

        <p className={`${styles.sidebarItemName} pt-1 ms-2 mb-0`}>
          Subscriptions
        </p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <ThumbUpOffAltIcon />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>
          Liked Videos
        </p>
      </div>

      <hr className="m-0" />

      <div className={`${styles.sidebarItem} mb-2 mt-2 d-flex align-items-center`}>
        <VideoLibraryOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>Library</p>
      </div>

      <div className={`${styles.sidebarItem} mb-2 d-flex align-items-center`}>
        <HistoryOutlinedIcon className="pt-1" />
        <p className={`${styles.sidebarItemName} pt-1 ms-1 mb-0`}>History</p>
      </div>

      <hr className="m-0" />

      <div className={`${styles.sidebarItem} mb-2 mt-2 d-flex align-items-center`}>
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
    </nav>
  );
};

export default Sidebar;
