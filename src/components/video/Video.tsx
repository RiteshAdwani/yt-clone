import React, { useEffect, useState } from "react";
import styles from "./Video.module.css";
import { Video as VideoType , ChannelIcon} from "../../utils/types";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Video = ({
  video,
  channelScreen,
}: {
  video: VideoType;
  channelScreen?: boolean;
}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;
  const [views, setViews] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [channelIcon, setChannelIcon] = useState<ChannelIcon | null>(null);
  const _videoId =
    (typeof id === "string"
      ? id
      : "videoId" in id
      ? id.videoId
      : id.channelId) || contentDetails?.videoId || "";
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };
  useEffect(() => {
    const getVideoDetails = async () => {
      if (!contentDetails) {
        return;
      }
        
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0]?.contentDetails?.duration);
      setViews(items[0]?.statistics?.viewCount);
    };
    getVideoDetails();
  }, [_videoId,contentDetails]);

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

  return (
    <div className={`${styles.video} mb-2 p-1`} onClick={handleVideoClick}>
      <div className={`${styles.videoTop} mb-1`}>
        <div className={styles.thumbnail}>
          <LazyLoadImage
            src={medium.url}
            effect="opacity"
            alt="Thumbnail"
            className={`rounded-4`}
            width="100%"
          />
        </div>
        <span className={styles.duration}>{_duration}</span>
      </div>

      <div className="d-flex mt-2">
        {!channelScreen && (
          <LazyLoadImage
            src={channelIcon?.url}
            alt="Channel Image"
            effect="opacity"
            className={`${styles.channelImg} rounded-circle`}
          />
        )}

        <div className="d-flex flex-column ms-2">
          <div className={`${styles.videoTitle} mb-1`}>{title}</div>
          {!channelScreen && (
            <p className={`${styles.channelName} mb-0 `}>{channelTitle}</p>
          )}
          <div className={`${styles.videoDetails} d-flex`}>
            <span>{numeral(views).format("0.a")} views</span>
            <span className="ps-1">• {moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
