import React from "react";
import styles from "./styles.module.css";
import Icon from "../Icon";

export const StatCard = ({
  title,
  uom,
  measurement,
  arrow,
  src,
  alt,
  percentage,
  summary,
}) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.title}>
        <h5>{title}</h5>
      </div>
      <div className={styles.description}>
        <div className={styles.metrics}>
          <p>{uom}</p>
          <h1>{measurement}</h1>
        </div>
        <div
          className={`styles.metricsDescription ${
            arrow === "decreasing" ? styles.decreasing : styles.increasing
          }`}
        >
          <Icon src={src} alt={alt} height={12} width={12}></Icon>
          <h3>{percentage}</h3>
        </div>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default StatCard;
