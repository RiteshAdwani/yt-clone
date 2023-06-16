import React from "react";
import styles from "./Video.module.css";
import thumbnail from "../../assets/thumbnail.jpg";
import channelImg from "../../assets/channel-img.jpg";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Video = () => {
  return (
    <div className={`${styles.video} mb-2 p-1`}>
      <div className={`${styles.videoTop} mb-1`}>
        <img className="w-100" src={thumbnail} alt="Thumbnail" />
        <span className={styles.duration}>05:43</span>
      </div>

      <div className={`${styles.videoTitle} mb-1`}>
        Create app in 5 minutes nfsojihadsef
      </div>

      <div className={`${styles.videoDetails} d-flex align-items-center`}>
        <span>
          <VisibilityIcon fontSize="small"/> 1M views •
        </span>
        <span className="ps-1">5 days ago</span>
      </div>

      <div className="d-flex align-items-center mt-2">
        <img src={channelImg} alt="Channel Image" className={`${styles.channelImg} rounded-circle`} />
        <p className={`${styles.channelName} ms-2 mb-0 `}>Rainbow Hat Jr</p>
      </div>
    </div>
  );
};

export default Video;
