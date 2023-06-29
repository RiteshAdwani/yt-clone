import React, { useEffect, useState } from "react";
import styles from "./RecommendedVideo.module.css";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Video as VideoType } from "../../utils/types";
import request from "../../api";
import { useNavigate } from "react-router-dom";

interface ChannelIcon {
  url: string;
}

const RecommendedVideo = ({
  video,
  searchScreen,
  subscriptionsScreen,
}: {
  video: VideoType;
  searchScreen?: boolean;
  subscriptionsScreen?: boolean;
}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      description,
      thumbnails: { medium },
      resourceId,
    },
  } = video;
  const isVideo =
    typeof id !== "string" &&
    !(id?.kind === "youtube#channel" || subscriptionsScreen);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState<ChannelIcon | null>(null);
  const navigate = useNavigate();
  const _channelId = resourceId?.channelId || channelId;
  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id:
            typeof id === "string"
              ? id
              : "videoId" in id
              ? id.videoId
              : id.channelId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    {
      isVideo && getVideoDetails();
    }
  }, [id, isVideo]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const handleClick = () => {
    isVideo
      ? navigate(
          `/watch/${
            typeof id === "string" ? id : "videoId" in id ? id.videoId : ""
          }`
        )
      : navigate(`/channel/${_channelId}`);
  };
  return (
    <>
      <hr className="d-lg-none mb-4" />
      <div
        className={`d-flex ${!isVideo ? "flex-row" : ""} ${isVideo ? "flex-column flex-sm-row" : ""} gap-3 mb-4 px-2`}
        onClick={handleClick}
        role="button"
      >
        <div className={`${styles.videoWrapper} ${isVideo ? "styles.video" : ""}`}>
          <LazyLoadImage
            src={medium.url}
            effect="opacity"
            alt="Thumbnail"
            width={isVideo ? "100%" : "50%" }
            height="100%"
            className={`${!isVideo ? styles.channel : "rounded-4"}`}
          />
          {isVideo && <span className={styles.duration}>{_duration}</span>}
        </div>

        <div className="w-100 px-1">
          <p className={`${styles.videoTitle} mb-1`}>{title}</p>
          {isVideo && (
            <div className={styles.videoDetails}>
              {`${numeral(views).format("0.a")} views`} •
              <span className={`ps-1`}>{moment(publishedAt).fromNow()}</span>
            </div>
          )}
          {(searchScreen || subscriptionsScreen) && (
            <p className="mt-1">
              {subscriptionsScreen
                ? description.substring(0, 150)
                : description.substring(0, 100)}
              ...
            </p>
          )}

          <div className="d-flex align-items-center my-1">
            {isVideo && (
              <LazyLoadImage
                src={channelIcon?.url}
                effect="opacity"
                alt="Thumbnail"
                className="rounded-circle"
                width={30}
              />
            )}
            <p className={`${styles.channelName} mb-0 ms-2`}>{channelTitle}</p>
          </div>
          {subscriptionsScreen && (
            <p className="mt-2">
              {video?.contentDetails?.totalItemCount} Videos
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendedVideo;
