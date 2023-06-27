import React,{ useEffect }  from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RecommendedVideo from '../../components/recommendedVidep/RecommendedVideo';
import { getVideosByChannel } from '../../redux/feature/videoSlice';
import { RootState, useAppDispatch } from '../../redux/store/store';
import styles from "./SubscriptionsScreen.module.css";

const SubscriptionsScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVideosByChannel());
  }, [dispatch]);

  const {loading,videos} = useSelector((state:RootState) => state.channelVideos)
  return (
    <Container fluid>
      {
        !loading ? videos?.map(video => <RecommendedVideo video={ video} key={typeof video.id === "string" ? video.id : "videoId" in video.id ? video.id.videoId : video.id.channelId} />) : <h3>Loading</h3>
      }
    </Container>
  )
}

export default SubscriptionsScreen
