import React, { useState } from "react";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../NavBar";

const CreateGrade = ({ updateGrade, closeForm, onSubmit, onUpdate }) => {
  const [grade, setGrade] = useState({
    gradeid: updateGrade ? updateGrade.gradeid : 0,
    gradename: updateGrade ? updateGrade.gradename : "",
    minimumsalary: updateGrade ? updateGrade.minimumsalary : 0,
    maximumsalary: updateGrade ? updateGrade.maximumsalary : 0,
    datecreated: updateGrade ? updateGrade?.datecreated : Date(),
    createdby: updateGrade ? updateGrade?.createdby : 0,
    lastupdateddate: updateGrade ? updateGrade?.lastupdateddate : Date(),
    updatedby: updateGrade ? updateGrade?.updatedby : 0,
  });

  const handleChange = (e) => {
    setGrade((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error cancelling current transaction!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3300/creategrade`, grade);
      setGrade((prev) => ({ ...prev, gradeid: res.data[0]?.gradeid }));
      onSubmit({
        ...grade,
        gradeid: res.data[0]?.gradeid,
      });
    } catch (error) {
      console.log(error);
      alert("Error adding Grade. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3300/updateGrade`, grade);
      console.log(grade);
      onUpdate(grade);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error updating Grade. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.gradeForm}>
        <h2>Create Grade</h2>
        <form>
          <div>
            <label>
              Grade Name<br></br>
              <input
                type="text"
                name="gradename"
                id="gradename"
                value={grade.gradename}
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
                name="minimumsalary"
                id="minimumsalary"
                value={grade.minimumsalary}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Maximum Salary<br></br>
              <input
                type="number"
                name="maximumsalary"
                id="maximumsalary"
                value={grade.maximumsalary}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          {updateGrade ? (
            <button type="submit" onClick={handleUpdate}>
              Update Grade
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Create Grade
            </button>
          )}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGrade;
