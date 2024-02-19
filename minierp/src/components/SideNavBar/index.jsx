import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

const SideNavBar = () => {
  // adding the states
  const [isActive, setIsActive] = useState(false);
  const [
    dropDownWorkForceStructuresActive,
    setDropDownWorkForceStructuresActive,
  ] = useState(false);

  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.side_bar_container}>
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
        <li
          onClick={() =>
            setDropDownWorkForceStructuresActive(
              !dropDownWorkForceStructuresActive
            )
          }
        >
          <a>Workforce Structures</a>
          <img src="images/dropdown.svg"></img>
          <ul
            className={
              dropDownWorkForceStructuresActive
                ? ""
                : `${styles.workForceStructures}`
            }
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
      <ul>Hello</ul>
    </div>
  );
};

export default SideNavBar;
