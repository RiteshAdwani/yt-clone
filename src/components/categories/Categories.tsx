import React, { useState } from "react";
import styles from "./Categories.module.css";

const Categories = () => {
  const keywords = [
    "All",
    "React JS",
    "Angular",
    "React Native",
    "Use of API",
    "Redux",
    "Music",
    "Algorithm art",
    "Guitar",
    "Coding",
    "Cricket",
    "Football",
    "Real Madrid",
    "Gatsby",
  ];

  const [activeElement, setActiveElement] = useState("All");
  const handleClick = (value: string) => {
    setActiveElement(value);
  };
  
  return (
    <div className={`${styles.categories} px-2 pt-1 pb-2 d-flex`}>
      {keywords.map((value, index) => (
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
