import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./SearchScreenVideoSkeleton.module.css";

const SearchScreenVideoSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#6c6e70" highlightColor="#7c7f83">
      <div className="d-flex">
        <Skeleton className={styles.thumbnail} />
        <div className="d-flex flex-column ms-3">
          <Skeleton className={styles.title} />
          <Skeleton className={styles.stats} />
          <Skeleton className={styles.description} />
          <div className="d-flex align-items-center mt-1">
            <Skeleton circle className={styles.channelIcon} />
            <Skeleton className={styles.channelName} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SearchScreenVideoSkeleton;
