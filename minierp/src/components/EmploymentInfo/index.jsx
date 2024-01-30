import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../NavBar";

const EmploymentInfo = () => {
  const [employmentInfo, setemploymentInfo] = useState({
    job: "",
    grade: "",
    department: "",
    location: "",
    manager: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setemploymentInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(employmentInfo);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      navigate("/employmentInfo");
    } catch (error) {
      console.log(error);
      alert("Error navigating to Employment Info form!");
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error navigating back!");
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error cancelling current transaction!");
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div class={styles.form_employmentInfo}>
        <h2>Hire an Employee</h2>
        <h3>Employment Info</h3>
        <form>
          <div class={styles.row}>
            <label>
              Job<br></br>
              <select
                id="job"
                onChange={handleChange}
                name="job"
                value={employmentInfo.job}
                required
              >
                <option value="MANAGER">Manager</option>
                <option value="DEVELOPER">Developer</option>
                <option value="Tester">Tester</option>
                <option value="HR">Hr</option>
                <option value="CEO">Cheif Executive Officer</option>
              </select>
            </label>
            <label>
              Grade<br></br>
              <select
                id="grade"
                onChange={handleChange}
                name="grade"
                value={employmentInfo.grade}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </label>
          </div>
          <div class={styles.row}>
            <label>
              Department<br></br>
              <select
                id="department"
                onChange={handleChange}
                name="department"
                value={employmentInfo.department}
                required
              >
                <option value="TECHNICAL">Technical</option>
                <option value="ADMIN">Administration</option>
                <option value="TESTING">Q & A</option>
                <option value="HR">Hr</option>
              </select>
            </label>
            <label>
              Location<br></br>
              <select
                id="location"
                onChange={handleChange}
                name="location"
                value={employmentInfo.location}
                required
              >
                <option value="UAE">United Arab Emirites</option>
                <option value="USA">United States</option>
                <option value="IND">India</option>
                <option value="JPN">Japan</option>
                <option value="EUR">Europe</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Manager<br></br>
              <select
                id="manager"
                onChange={handleChange}
                name="manager"
                value={employmentInfo.manager}
                required
              >
                <option value="JYOTHI">Jyothi</option>
                <option value="SANTOSH">Santosh</option>
                <option value="NALLURI">Nalluri</option>
              </select>
            </label>
          </div>
        </form>
        <div class={styles.buttons}>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EmploymentInfo;
