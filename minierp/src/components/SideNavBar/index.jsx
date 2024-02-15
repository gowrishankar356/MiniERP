import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

const SideNavBar = () => {
  // adding the states
  const [isActive, setIsActive] = useState(false);
  const [isSecondLevleActive, setIsSecondLevleActive] = useState(false);

  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };

  const secondLevelActive = () => {
    setIsSecondLevleActive(true);
  };

  const secondLevelInActive = () => {
    setIsSecondLevleActive(false);
  };

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 35) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={styles.side_bar_container}>
      <div>
        <div>
          <ul>
            <li onClick={removeActive}>
              <a href="/">Home</a>
            </li>
          </ul>
          <ul>
            <li onClick={removeActive}>
              <a href="/personalDetails">HR Activities</a>
            </li>
          </ul>
          <ul>
            <li onClick={removeActive}>
              <a onClick={secondLevelActive}>Workforce Structures</a>
              <ul
                className={`${styles.second_levelnav} ${
                  isSecondLevleActive
                    ? styles.second_level_active
                    : styles.second_level_inactive
                }`}
                onClick={(e) => {
                  secondLevelInActive();
                }}
              >
                <li>
                  <a href="/createCompany">Manage Companies</a>
                </li>
                <li>
                  <a href="/createGrade">Manage Grades</a>
                </li>
                <li>
                  <a href="/createJob">Manage Jobs</a>
                </li>
                <li>
                  <a href="/createDepartment">Manage departments</a>
                </li>
                <li>
                  <a href="/createLocation">Manage locations</a>
                </li>
                <li>
                  <a href="/createElement">Manage elements</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
        onClick={toggleActiveClass}
      >
        <span className={`${styles.bar}`}></span>
        <span className={`${styles.bar}`}></span>
        <span className={`${styles.bar}`}></span>
      </div>
    </div>
  );
};

export default SideNavBar;
