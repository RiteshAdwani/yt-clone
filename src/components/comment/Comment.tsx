import React from 'react';
import avatar from "../../assets/avatar.png";
import moment from 'moment';
import styles from "./Comment.module.css";

const Comment = () => {
  return (
    <div className={`${styles.comment} d-flex`}>
      <img src={avatar} alt="avatar" className={`${styles.avatar} rounded-circle me-3`}/>
      <div>
        <p className={`${styles.userName} mb-1`}>
          Ritesh Adwani • {moment("2022-05-05").fromNow()}
        </p>
        <p className={styles.commentText}>The best finisher for a reason! Thala supremacy 💛 </p>
      </div>
    </div>
  )
}

export default Comment
