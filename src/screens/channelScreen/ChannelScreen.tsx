import numeral from "numeral";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoSkeleton from "../../components/skeleton/videoSkeleton/VideoSkeleton";
import Video from "../../components/video/Video";
import { getChannelDetails } from "../../redux/feature/channelSlice";
import { getVideosByChannel } from "../../redux/feature/videoSlice";
import { RootState, useAppDispatch } from "../../redux/store/store";
import styles from "./ChannelScreen.module.css";

const ChannelScreen = () => {
  const { channelId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (channelId) {
      dispatch(getVideosByChannel(channelId));
      dispatch(getChannelDetails(channelId));
    }
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector(
    (state: RootState) => state.channelVideos
  );

  const subscriptionStatus = useSelector(
    (state: RootState) => state.channelDetails.subscriptionStatus
  );
  const { channel } = useSelector((state: RootState) => state.channelDetails);
  const snippet = channel?.snippet;
  const statistics = channel?.statistics;

  return (
    <>
      <div
        className={`${styles.channelHeader} px-5 py-2 my-2 d-flex justify-content-between align-items-center`}
      >
        <div className="d-flex align-items-center">
          <img
            src={snippet?.thumbnails?.default?.url}
            alt="ChannelIcon"
            className={`${styles.channelIcon} rounded-circle me-3`}
          />

          <div className="me-3">
            <h3 className={styles.channelTitle}>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} Subscribers
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

      <Container>
        <Row className="mt-2">
          {!loading ? (
            videos?.map((video) => (
              <Col md={4} lg={3} key={typeof video.id === "string"
              ? video.id
              : "videoId" in video.id
              ? video.id.videoId
              : video.id.channelId}>
                <Video video={video} channelScreen />
              </Col>
            ))
          ) : (
            [...Array(20)].map((_,index) => (
              <Col lg={3} md={4}  key={index}>
                <VideoSkeleton />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
