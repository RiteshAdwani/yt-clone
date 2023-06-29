import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import Comment from "../comment/Comment";
import { RootState, useAppDispatch } from "../../redux/store/store";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/feature/commentSlice";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/default-avatar.png"

interface CommentsProps {
  videoId: string;
  totalComments?: string;
}

const Comments = ({ videoId,totalComments }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const photoURL = useSelector((state: RootState) => state.auth?.user?.photoURL) || defaultAvatar;

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId]);

  const commentList = useSelector((state: RootState) => state.comment.comments);
  const comments = commentList?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(commentText.length === 0) return
    dispatch(addComment({ id: videoId, text: commentText }));
    setCommentText("");
    console.log("Commented");
  };
  return (
    <div>
      <p>{totalComments} Comments</p>
      <div className="d-flex w-100 my-2">
        <img
          src={photoURL}
          alt="avatar"
          className={`${styles.avatar} rounded-circle me-3`}
        />
        <form
          className="d-flex justify-content-between w-100"
          onSubmit={handleCommentSubmit}
        >
          <input
            type="text"
            placeholder="Write a comment..."
            className={`${styles.commentInput} w-100`} 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className={`${styles.commentBtn} rounded-5 border-none px-3`}>
            Comment
          </button>
        </form>
      </div>
      <hr className="my-1 ms-5 me-1" />
      <div className="mt-4">
        {comments?.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
