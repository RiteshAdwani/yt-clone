import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import RecommendedVideo from "../../components/recommendedVidep/RecommendedVideo";
import SearchScreenVideoSkeleton from "../../components/skeleton/searchScreenVideoSkeleton/SearchScreenVideoSkeleton";
import { getSubscribedChannels } from "../../redux/feature/channelSlice";
import { RootState, useAppDispatch } from "../../redux/store/store";

const SubscriptionsScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  const { loading, videos } = useSelector(
    (state: RootState) => state.channelSubscriptions
  );
  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video) => (
          <RecommendedVideo
            video={video}
            key={
              typeof video.id === "string"
                ? video.id
                : "videoId" in video.id
                ? video.id.videoId
                : video.id.channelId
            }
            subscriptionsScreen
          />
        ))
      ) : (
        <SearchScreenVideoSkeleton/>
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
