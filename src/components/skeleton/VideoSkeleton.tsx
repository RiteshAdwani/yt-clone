import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const VideoSkeleton = () => {
  return (
    <div className="mb-2 p-1 w-100">
      <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
        
          <div className="mb-1">
            <Skeleton height={180} width={100} />
          </div>

          <div className="d-flex mt-2">
            <Skeleton height={40} width={40} circle />
            <div className="d-flex flex-column">
            <Skeleton height={20} width={ 60} />
              <Skeleton height={15} width={60} />
              <Skeleton height={10} width={60} />
            </div>
          </div>
        
      </SkeletonTheme>
    </div>
  );
};

export default VideoSkeleton;
