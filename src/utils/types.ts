export interface User {
  name: string;
  photoURL: string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error?: string;
}

export interface Channel {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
  };
}

export interface ChannelState {
  loading: boolean;
  channel: Channel | null;
  subscriptionStatus: boolean;
  error?: string | null;
}

export interface ChannelSubscriptionsState {
  videos: Video[];
  loading: boolean;
  error?: string;
}

export interface Comment {
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        publishedAt: string;
      };
    };
  };
}

export interface CommentListState {
  loading: boolean;
  comments: Comment[] | null;
  error?: string;
}

export interface HomeVideosState {
  videos: Video[];
  loading: boolean;
  nextPageToken: string | null;
  activeCategory: string;
  error?: string;
}

export interface SearchVideosState {
  videos: Video[];
  loading: boolean;
  error?: string;
}

export interface SelectedVideoState {
  selectedVideo: Video | null;
  loading: boolean;
  error?: string;
}

export interface RelatedVideosState {
  videos: Video[] | null;
  loading: boolean;
  error?: string;
}

export interface ChannelVideosState {
  videos: Video[] | null;
  loading: boolean;
  error?: string;
}

export interface LikedVideosState {
  videos: Video[] | null;
  loading: boolean;
  error?: string;
}


export interface Video {
  id:
    string
    | { videoId: string; kind: string }
    | { channelId: string; kind: string };
  snippet: {
    channelId: string;
    resourceId: {
      channelId: string;
    };
    channelTitle: string;
    title: string;
    publishedAt: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    subscriberCount: string;
    commentCount: string;
  };
  contentDetails: {
    totalItemCount: string;
    videoId: string;
  };
  channelScreen?: boolean;
}

export interface ChannelIcon {
  url: string;
}

