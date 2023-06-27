import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comments from '../../components/comments/Comments';
import RecommendedVideo from '../../components/recommendedVidep/RecommendedVideo';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { getRelatedVideos, getVideosById, RelatedVideosState, SelectedVideoState } from '../../redux/feature/videoSlice';
import { useAppDispatch } from '../../redux/store/store';
import styles from "./WatchScreen.module.css";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {selectedVideo,loading:relatedVideosLoading} = useSelector((state: { selectedVideo:SelectedVideoState })=> state.selectedVideo)
  const {videos,loading} = useSelector((state:{ relatedVideos:RelatedVideosState})=>state.relatedVideos)
  const videoId = id || "";
  useEffect(() => {
    if (id) {
      dispatch(getVideosById(id))
      dispatch(getRelatedVideos(id))
    }
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
          !loading ? <VideoMetaData selectedVideo={ selectedVideo} videoId={videoId} /> : <h6>Loading...</h6>
        }
        
        <Comments videoId={videoId} totalComments={ selectedVideo?.statistics?.commentCount} />
      </Col>
      <Col lg={4} className="mt-3 mt-lg-0">
        {
          !relatedVideosLoading ?
            videos?.filter((video) => video.snippet)
              .map((video) => <RecommendedVideo video={video} key={typeof video.id === "string" ? video.id : "videoId" in video.id ? video.id.videoId : video.id.channelId} />)
            : <Skeleton width={130} height={ 90} />
        }
      </Col>
    </Row>
  )
}

export default WatchScreen
