import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./VideoMetaDataSkeleton.module.css";

const VideoMetaDataSkeleton = () => {
  return (
    <div className="py-2">
      <div>
        <Skeleton className={styles.title} />
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            <Skeleton className={styles.videoDetails} />
          </span>

          <div className="d-flex ">
            <span className="me-3">
              <Skeleton circle className={styles.icon} />
            </span>
            <span className="me-3">
              <Skeleton circle className={styles.icon} />
            </span>
          </div>
        </div>
      </div>

      <hr className="my-2" />
      <div
        className={`d-flex justify-content-between align-items-center my-1 py-2`}
      >
        <div className="d-flex">
          <Skeleton circle className={ styles.channelIcon} />
          <div className="d-flex flex-column pt-1 ms-3">
            <Skeleton className={styles.channelTitle} />
            <Skeleton className={ styles.statistics} />
          </div>
        </div>
      </div>

      <hr className="my-2" />
    </div>
  );
};

export default VideoMetaDataSkeleton;
