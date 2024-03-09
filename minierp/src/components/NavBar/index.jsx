import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import SideNavBar from "../SideNavBar";

const NavBar = () => {
  // adding the states
  // const [isActive, setIsActive] = useState(false);
  const [isSecondLevleActive, setIsSecondLevleActive] = useState(false);

  const [isSideNaveBarActive, SetIsSideNaveBarActive] = useState(false);

  // //add the active class
  // const toggleActiveClass = () => {
  //   setIsActive(!isActive);
  // };

  // //clean up function to remove the active class
  // const removeActive = () => {
  //   setIsActive(false);
  // };

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
    <div>
      <div className={`${styles.nav_bar} ${color ? styles.nav_bar_bg : ""}`}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            onClick={() => {
              SetIsSideNaveBarActive(!isSideNaveBarActive);
            }}
            href="#"
          >
            <img
              src="images/menu.svg"
              alt="menu icon"
              className={styles.image}
            ></img>
          </button>
          <div className={styles.nav_bar_about}>
            <h2>Employee Tracker | </h2>
            <h4>A Mini ERP System.</h4>
          </div>
        </div>
        <div className={styles.nav_bar_sub_content}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/personalDetails">HR Activities</a>
            </li>
          </ul>
          <ul>
            <li>
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
                  <a href="/company">Manage Companies</a>
                </li>
                <li>
                  <a href="/grade">Manage Grades</a>
                </li>
                <li>
                  <a href="/createJob">Manage Jobs</a>
                </li>
                <li>
                  <a href="/department">Manage departments</a>
                </li>
                <li>
                  <a href="/location">Manage locations</a>
                </li>
                <li>
                  <a href="/createElement">Manage elements</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <div
          className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
          onClick={toggleActiveClass}
        >
          <span className={`${styles.bar}`}></span>
          <span className={`${styles.bar}`}></span>
          <span className={`${styles.bar}`}></span>
        </div> */}
      </div>
      {isSideNaveBarActive && <SideNavBar></SideNavBar>}
    </div>
  );
};

export default NavBar;
