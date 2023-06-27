import React from "react";
// import avatar from "../../assets/avatar.png";
import moment from "moment";
import styles from "./Comment.module.css";

interface CommentProps {
  comment: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    textDisplay: string;
    publishedAt: string;
  };
}

const Comment = ({ comment }: CommentProps) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    publishedAt
  } = comment;
  return (
    <div className={`${styles.comment} d-flex`}>
      <img
        src={authorProfileImageUrl}
        alt="avatar"
        className={`${styles.avatar} rounded-circle me-3`}
      />
      <div>
        <p className={`${styles.userName} mb-1`}>
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className={styles.commentText}>{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
