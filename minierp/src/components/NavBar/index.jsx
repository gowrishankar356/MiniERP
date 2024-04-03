import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import SideNavBar from "../SideNavBar";
import Icon from "../Icon";

const NavBar = () => {
  // adding the states
  // const [isActive, setIsActive] = useState(false);
  const [isSecondLevleActiveWorkForce, setIsSecondLevleActiveWorkForce] =
    useState(false);

  const [isSecondLevleActiveCoreHR, setIsSecondLevleActiveCoreHR] =
    useState(false);

  const [isSecondLevleActivePayroll, setIsSecondLevleActivePayroll] =
    useState(false);

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
    setIsSecondLevleActiveWorkForce(true);
  };

  const secondLevelInActive = () => {
    setIsSecondLevleActiveWorkForce(false);
  };

  const secondLevelActiveHR = () => {
    setIsSecondLevleActiveCoreHR(true);
  };

  const secondLevelInActiveHR = () => {
    setIsSecondLevleActiveCoreHR(false);
  };

  const secondLevelActivePayroll = () => {
    setIsSecondLevleActivePayroll(true);
  };

  const secondLevelInActivePayroll = () => {
    setIsSecondLevleActivePayroll(false);
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
            <Icon
              src={"images/menu.svg"}
              alt={"menu svg"}
              height={30}
              width={30}
            ></Icon>
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
            <li className={styles.dropDown}>
              <a onClick={secondLevelActive}>Workforce Structures</a>
              <Icon
                src={"images/dropdown.svg"}
                alt={"dropdown svg"}
                height={12}
                width={12}
              ></Icon>
              <ul
                className={`${styles.second_levelnav} ${
                  isSecondLevleActiveWorkForce
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
                  <a href="/job">Manage Jobs</a>
                </li>
                <li>
                  <a href="/department">Manage departments</a>
                </li>
                <li>
                  <a href="/location">Manage locations</a>
                </li>
                <li>
                  <a href="/element">Manage elements</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li className={styles.dropDown}>
              <a onClick={secondLevelActiveHR}>Core HR Activities</a>
              <Icon
                src={"images/dropdown.svg"}
                alt={"dropdown svg"}
                height={12}
                width={12}
              ></Icon>
            </li>

            <ul
              className={`${styles.second_levelnavHR} ${
                isSecondLevleActiveCoreHR
                  ? styles.second_level_active
                  : styles.second_level_inactive
              }`}
              onClick={(e) => {
                secondLevelInActiveHR();
              }}
            >
              <li>
                <a href="/employees">Manage Employees</a>
              </li>
            </ul>
          </ul>
          <ul className={styles.unordered}>
            <li className={styles.dropDown}>
              <a onClick={secondLevelActivePayroll}>Payroll Activities</a>
              <Icon
                src={"images/dropdown.svg"}
                alt={"dropdown svg"}
                height={12}
                width={12}
              ></Icon>
            </li>

            <ul
              className={`${styles.second_levelnavHR} ${
                isSecondLevleActivePayroll
                  ? styles.second_level_active
                  : styles.second_level_inactive
              }`}
              onClick={(e) => {
                secondLevelInActivePayroll();
              }}
            >
              <li>
                <a href="/payroll">Run Payroll</a>
              </li>
            </ul>
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
