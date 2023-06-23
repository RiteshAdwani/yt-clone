import React from "react";
import styles from "./RecommendedVideo.module.css";
// import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Col, Row } from "react-bootstrap";
import thumbnail from "../../assets/thumbnail.jpg";

const RecommendedVideo = () => {
  const seconds = moment.duration("100").asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
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

    <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
      <div className={styles.videoWrapper}>
        <LazyLoadImage
          src={thumbnail}
          effect="opacity"
          alt="Thumbnail"
          className={styles.video}
        />
        <span className={styles.duration}>{_duration}</span>
      </div>

      <div>
        <p className={`${styles.videoTitle} mb-2`}>Be a full stack developer in one month</p>
        <div className={styles.videoDetails}>
          {numeral("10000").format("0.a")} •
          <span className={`ps-1`}>{moment("2020-04-04").fromNow()}</span>
        </div>
        <div className="d-flex align-items-center my-1">
          {/* <LazyLoadImage src={thumbnail} effect="opacity" alt="Thumbnail" /> */}
          <p className={`${styles.channelName} mb-0`}>ICC</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedVideo;
