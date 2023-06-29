import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RecommendedVideo from "../../components/recommendedVidep/RecommendedVideo";
import SearchScreenVideoSkeleton from "../../components/skeleton/searchScreenVideoSkeleton/SearchScreenVideoSkeleton";
import { getVideosBySearch } from "../../redux/feature/videoSlice";
import { RootState, useAppDispatch } from "../../redux/store/store";

const SearchScreen = () => {
  const { query } = useParams<{ query: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query) dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  const { videos, loading } = useSelector(
    (state: RootState) => state.searchVideos
  );

  return (
    <Container>
      {!loading
        ? videos.map((video) => (
          <RecommendedVideo
            video={video}
            key={
              typeof video.id === "string"
                ? video.id
                : "videoId" in video.id
                  ? video.id.videoId
                  : video.id.channelId
            }
            searchScreen
          />
        ))
        :
        <SearchScreenVideoSkeleton />
      }
    </Container>
  );
};

export default SearchScreen;
