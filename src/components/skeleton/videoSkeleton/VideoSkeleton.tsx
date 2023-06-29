import React from "react";
import styles from "./VideoSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const VideoSkeleton = () => {
  return (
    <div className="mb-2 p-1">
      <SkeletonTheme baseColor="#6c6e70" highlightColor="#7c7f83" >
        <div className="mb-1" style={{ width:'100%'}}>
          <Skeleton className={styles.thumbnail} />
        </div>

        <div className="d-flex mt-2" >
          <div className={styles.channelIcon} >
            <Skeleton circle  className={styles.channelIcon}/>
          </div>
          <div className={`d-flex flex-column ms-2 w-100`} >
            <Skeleton className={styles.details} />
            <Skeleton className={styles.details} />
            <Skeleton className={styles.details} />
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default VideoSkeleton;
