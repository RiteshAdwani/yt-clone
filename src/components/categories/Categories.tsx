import React, { useState } from "react";
import { getPopularVideos, getVideosByCategory } from "../../redux/feature/videoSlice";
import { useAppDispatch } from "../../redux/store/store";
import styles from "./Categories.module.css";
import categories from "../../utils/constants";

const Categories = () => {
  const [activeElement, setActiveElement] = useState("All");
  const dispatch = useAppDispatch();
  const handleClick = (value: string) => {
    setActiveElement(value);
    if (value === "All")
      dispatch(getPopularVideos());
    else 
      dispatch(getVideosByCategory(value));
  };
  
  return (
    <div className={`${styles.categories} px-2 pt-1 pb-2 d-flex`}>
      {categories.map((value, index) => (
        <span
          key={index}
          onClick={() => handleClick(value)}
          className={`me-3 px-3 py-2 ${styles.keyword} ${
            activeElement === value ? styles.active : ""
          }`}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default Categories;
