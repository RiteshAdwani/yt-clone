import React from 'react'
import styles from "./Comments.module.css";
import avatar from "../../assets/avatar.png";
import Comment from '../comment/Comment';

const Comments = () => {
  const handleCommentSubmit = () => {
    console.log("Commented");
  }
  return (
    <div>
      <p>1234 Comments</p>
      <div className='d-flex w-100 my-2'>
        <img src={avatar} alt="avatar" className={`${styles.avatar} rounded-circle me-3`}/>
        <form className='d-flex justify-content-between w-100' onSubmit={handleCommentSubmit}>
          <input type="text" placeholder='Write a comment...' className={styles.commentInput} />
          <button className={`${styles.commentBtn} rounded-5 border-none px-3`}>Comment</button>
        </form>
      </div>
      <hr className='my-1 ms-5 me-1'/>
      <div className='mt-4'>
        {[...Array(15)].map(() => <Comment/>)}
      </div>
    </div>
  )
}

export default Comments
