import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

const SideNavBar = () => {
  // adding the states
  const [
    dropDownWorkForceStructuresActive,
    setDropDownWorkForceStructuresActive,
  ] = useState(false);
  const [dropDownCoreHRActive, setDropDownCoreHRActive] = useState(false);
  const [dropDownPayrollActive, setDropDownPayrollActive] = useState(false);

  return (
    <div className={styles.side_bar_container}>
      <div className={styles.side_bar_container_background}></div>
      <div className={styles.side_bar_content}>
        <ul>
          <li>
            <a href="/">Home</a>
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
            <img src="images/dropdown.svg" alt="dropdown svg"></img>
            <ul
              className={
                dropDownWorkForceStructuresActive
                  ? `${styles.workForceStructuresActive}`
                  : `${styles.workForceStructures}`
              }
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
                <a href="/createElement">Manage elements</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li onClick={() => setDropDownCoreHRActive(!dropDownCoreHRActive)}>
            <a>Core HR Activities</a>
            <img src="images/dropdown.svg" alt="dropdown svg"></img>
            <ul
              className={
                dropDownCoreHRActive
                  ? `${styles.workForceStructuresActive}`
                  : `${styles.workForceStructures}`
              }
            >
              <li>
                <a href="/employees">Manage Employees</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li onClick={() => setDropDownPayrollActive(!dropDownPayrollActive)}>
            <a>Payroll Activities</a>
            <img src="images/dropdown.svg" alt="dropdown svg"></img>
            <ul
              className={
                dropDownPayrollActive
                  ? `${styles.workForceStructuresActive}`
                  : `${styles.workForceStructures}`
              }
            >
              <li>
                <a href="/payroll">Run Payroll</a>
              </li>
              <li>
                <a href="/payrollResults">Payroll Results</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
