import React, { useState, useEffect } from "react";
import styles from "./VideoMetaData.module.css";
import moment from "moment";
import numeral from "numeral";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Video } from "../../utils/types";
import { RootState, useAppDispatch } from "../../redux/store/store";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/feature/channelSlice";
import { useSelector } from "react-redux";
import CustomHelmet from "../helmet/CustomHelmet";

interface VideoMetaDataProps {
  selectedVideo: Video | null;
}

const VideoMetaData = ({ selectedVideo}: VideoMetaDataProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { channelId, channelTitle, description, title, publishedAt } =
    selectedVideo?.snippet || {};
  const { viewCount, likeCount, dislikeCount } =
    selectedVideo?.statistics || {};
  const channelDetails = useSelector(
    (state: RootState) => state.channelDetails.channel
  );

  const subscriptionStatus = useSelector(
    (state: RootState) => state.channelDetails.subscriptionStatus
  );
  const dispatch = useAppDispatch();

  const toggleDescription = () => {
    setShowFullDescription((prevDescription) => !prevDescription);
  };
  const videoDescription = description || "";

  const truncatedDescription = showFullDescription
    ? videoDescription
    : videoDescription.substring(0, 100);

  useEffect(() => {
    if (channelId) {
      dispatch(checkSubscriptionStatus(channelId));
      dispatch(getChannelDetails(channelId));
    }
  }, [dispatch, channelId]);

  return (
    <div className={`${styles.videoMetaData} py-2`}>
      <CustomHelmet title={title} description={description} />
      <div className={styles.videoDetails}>
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {`${numeral(viewCount).format("0.a")} views`} •{" "}
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="me-3">
              <ThumbUpOutlinedIcon className="me-1" />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="me-3">
              <ThumbDownOutlinedIcon className="me-1" />
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>

      <hr className="my-2" />
      <div
        className={`${styles.channelDetails} d-flex justify-content-between align-items-center my-1 py-2`}
      >
        <div className="d-flex">
          <img
            src={channelDetails?.snippet?.thumbnails?.default?.url}
            alt="logo"
            className={`${styles.channelLogo} rounded-circle me-3`}
          />
          <div className="d-flex flex-column pt-1">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelDetails?.statistics?.subscriberCount).format(
                "0.a"
              )}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={`${styles.subscribeBtn} text-white rounded-5 px-3 py-1 ${
            subscriptionStatus ? styles.subscribedBtn : ""
          }`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <hr className="my-2" />

      <div
        className={`${styles.videoDescription} ${
          showFullDescription ? styles.expanded : ""
        }`}
      >
        {videoDescription.length > 100
          ? truncatedDescription
          : videoDescription}
      </div>
      {videoDescription.length > 100 && !showFullDescription && (
        <div
          onClick={toggleDescription}
          role="button"
          className={styles.showMoreText}
        >
          ... Show More
        </div>
      )}
      {showFullDescription && (
        <div
          className={styles.showLessText}
          onClick={toggleDescription}
          role="button"
        >
          Show Less
        </div>
      )}
    </div>
  );
};

export default VideoMetaData;
