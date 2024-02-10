import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../NavBar";

const CreateGrade = () => {
  const [grade, setGrade] = useState({
    gradeName: "",
    minimumSalary: 0,
    maximumSalary: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setGrade((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3300/creategrade`, grade);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding Grade. Please try again.");
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.form_creategrade}>
        <h2>Create Location</h2>
        <form>
          <div>
            <label>
              Grade Name<br></br>
              <input
                type="text"
                name="gradeName"
                id="gradeName"
                value={grade.gradeName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Minimum Salary<br></br>
              <input
                type="number"
                name="minimumSalary"
                id="minimumSalary"
                value={grade.minimumSalary}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Maximum Salary<br></br>
              <input
                type="number"
                name="maximumSalary"
                id="maximumSalary"
                value={grade.maximumSalary}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          <button type="submit" onClick={handleSubmit}>
            Create Grade
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGrade;
