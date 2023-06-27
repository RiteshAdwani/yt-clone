import React, { useEffect, useState } from "react";
import styles from "./RecommendedVideo.module.css";
// import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Col, Row } from "react-bootstrap";
// import thumbnail from "../../assets/thumbnail.jpg";
import { Video as VideoType } from "../../redux/feature/videoSlice";
import request from "../../api";
import { useNavigate } from "react-router-dom";

// interface RecommendedVideoProps{
//   video: {
//     id: string;
//     snippet: {
//       channelId: string;
//       channelTitle: string;
//       description: string;
//       title: string;
//       publishedAt: string;
//       thumbnails: string;
//     }
//   }
// }

interface ChannelIcon {
  url: string;
}

const RecommendedVideo = ({ video }: { video: VideoType }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      description,
      thumbnails: { medium },
    },
  } = video;
  const isVideo = typeof id !== "string" && id?.kind === "youtube#video";
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState<ChannelIcon | null>(null);
  const navigate = useNavigate();
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
    getVideoDetails();
  }, [id]);

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
    isVideo ? 
    navigate(
      `/watch/${
        typeof id === "string" ? id : "videoId" in id ? id.videoId : ""
      }`
    ) : navigate(
      `/channel/${
      typeof id !== "string" && 
        "channelId" in id ? id.channelId : "" 
      }`
    );
  };
  return (
    // <Row className='m-1 py-2 align-items-center d-flex'>
    //   <Col xs={6} md={4}>
    //     <LazyLoadImage src={thumbnail} effect="opacity" alt="Thumbnail" height="120px"/>
    //     <span className={styles.duration}>{_duration}</span>
    //   </Col>
    //   <Col xs={6} md={8} className="p-0">
    //     <p className='mb-1'>Be a full stack developer in one month</p>
    //     <div>
    //       {numeral(100000).format("0.a")} •
    //       <span className="ps-1">{moment("2020-04-04").fromNow()}</span>
    //     </div>
    //     <div className='d-flex align-items-center my-1'>
    //       {/* <LazyLoadImage src={thumbnail} effect="opacity" alt="Thumbnail" /> */}
    //       <p>ICC</p>
    //     </div>
    //   </Col>
    // </Row>

    <div
      className="d-flex flex-column flex-sm-row gap-3 mb-4 align-items-center"
      onClick={handleClick}
      role="button"
    >
      <div className={styles.videoWrapper}>
        <LazyLoadImage
          src={medium.url}
          effect="opacity"
          alt="Thumbnail"
          className={`${styles.video} ${!isVideo ? styles.channel : ""}`}
        />
        {isVideo &&
          <span className={styles.duration}>{_duration}</span>}
      </div>

      <div>
        <p className={`${styles.videoTitle} mb-2`}>{title}</p>
        {isVideo && (
          <div className={styles.videoDetails}>
            {`${numeral(views).format("0.a")} views`} •
            <span className={`ps-1`}>{moment(publishedAt).fromNow()}</span>
          </div>
        )}
        {isVideo && <p className="mt-1">{description}</p>}

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
      </div>
    </div>
  );
};

export default RecommendedVideo;
