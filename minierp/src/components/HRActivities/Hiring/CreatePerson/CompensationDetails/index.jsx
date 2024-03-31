import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import NavBar from "../../../../NavBar";

import Table from "../../../../Table";
import { AddtionalCompensationForm } from "../AddtionalCompensationDetails";

const CompensationInfo = () => {
  const location = useLocation();

  const [compensationFormOpen, setCompensationFormOpen] = useState(false);

  const personalDetails = location.state?.personalDetails;
  const demographicDetails = location.state?.demographicDetails;
  const employmentDetails = location.state?.employmentDetails;
  const [compensations, setCompensations] = useState([]);

  const [compensationInfo, setCompensationInfo] = useState({
    basicSalary: 0,
    annualBasicSalary: 0,
  });

  const handleDelete = (targetIndex) => {
    setCompensations(compensations.filter((_, idx) => idx !== targetIndex));
  };

  const handleAdd = (newRow) => {
    setCompensations([...compensations, newRow]);
    setCompensationFormOpen(false);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompensationInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(personalDetails);
      await axios.post(`http://localhost:3300/createperson`, {
        personalDetails: personalDetails,
        demographicDetails: demographicDetails,
        employmentDetails: employmentDetails,
        compensations: compensations,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error navigating to Compensation Info form!");
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

  const handleSetCompensation = async (e) => {
    e.preventDefault();
    setCompensationFormOpen(true);
  };

  return (
    <div className={styles.containerCompensationForm}>
      <NavBar></NavBar>
      <div className={styles.compensationForm}>
        <h2>Hire an Employee</h2>
        <h3>Compensation Info</h3>
        <form>
          <div>
            <label>
              Basic Salary<br></br>
              <input
                type="number"
                name="basicSalary"
                id="basicSalary"
                value={compensationInfo.basicSalary}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Annual Basic Salary<br></br>
              <input
                type="number"
                name="annualBasicSalary"
                placeholder=""
                id="annualBasicSalary"
                value={compensationInfo.annualBasicSalary}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <Table rows={compensations} deleteRow={handleDelete}></Table>
          <button
            // className={styles.addCompensation}
            onClick={handleSetCompensation}
          >
            Add Compensation
          </button>
          {compensationFormOpen && (
            <AddtionalCompensationForm
              closeForm={() => setCompensationFormOpen(false)}
              onSubmit={handleAdd}
            ></AddtionalCompensationForm>
          )}
        </form>
        <div className={styles.buttons}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CompensationInfo;
