import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/Comments';
import RecommendedVideo from '../../components/recommendedVidep/RecommendedVideo';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { getVideosById, SelectedVideoState } from '../../redux/feature/videoSlice';
import { useAppDispatch } from '../../redux/store/store';
import styles from "./WatchScreen.module.css";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {selectedVideo,loading} = useSelector((state: { selectedVideo:SelectedVideoState })=> state.selectedVideo)

  useEffect(() => {
    if(id)
      dispatch(getVideosById(id))
  }, [dispatch, id]);
  return (
    <Row>
      <Col lg={8}>
        <div className={`${styles.watchScreenPlayer} mb-4`}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          width="100%"
          height="100%"
            title={selectedVideo?.snippet?.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        />
        </div>
        {
          !loading ? <VideoMetaData selectedVideo={ selectedVideo} videoId={id} /> : <h6>Loading...</h6>
        }
        
        <Comments/>
      </Col>
      <Col lg={4} className="mt-3 mt-lg-0">
        {
          [...Array(10)].map(() => <RecommendedVideo/>)
        }
      </Col>
    </Row>
  )
}

export default WatchScreen
