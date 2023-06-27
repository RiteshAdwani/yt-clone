import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import RecommendedVideo from '../../components/recommendedVidep/RecommendedVideo';
import { getVideosBySearch } from '../../redux/feature/videoSlice';
import { RootState, useAppDispatch } from '../../redux/store/store';

const SearchScreen = () => {
  const { query } = useParams<{query:string}>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query)
      dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state: RootState) => state.searchVideos);
  console.log(videos)

  return (
    <Container>
      {!loading ? (
        videos && videos.length > 0 ? (
          videos.map((video) => (
            <RecommendedVideo
              video={video}
              key={typeof video.id === "string" ? video.id : "videoId" in video.id ? video.id.videoId : video.id.channelId}
            />
          ))
        ) : (
          <h2>No videos found.</h2>
        )
      ) : (
        <h2>Loading...</h2>
      )}
    </Container>
  );
}

export default SearchScreen;

