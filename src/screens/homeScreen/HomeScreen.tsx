import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Categories from "../../components/categories/Categories";
import Video from "../../components/video/Video";
import { getPopularVideos, getVideosByCategory } from "../../redux/feature/videoSlice";
import { useAppDispatch } from "../../redux/store/store";
import { HomeVideosState } from "../../redux/feature/videoSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoSkeleton from "../../components/skeleton/VideoSkeleton";

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    (state: { homeVideos: HomeVideosState }) => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === "All") dispatch(getPopularVideos());
    else dispatch(getVideosByCategory(activeCategory));
  };

  return (
    <>
      <Container>
        <Categories />
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          loader={
            loading ? (
              <div className="spinner-border text-danger d-block mx-auto"></div>
            ) : null
          }
          className="row"
        >
          {videos.map((video) => (
            <Col
              lg={3}
              md={4}
              key={
                typeof video.id === "string" ? video.id : video.id.videoId
              }
            >
              <Video video={video} />
            </Col>
          ))}
        </InfiniteScroll>
        {loading && videos.length === 0 && (
          <div className="text-center">
            <VideoSkeleton />
          </div>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
