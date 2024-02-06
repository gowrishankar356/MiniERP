import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import NavBar from "../../../../NavBar";

import Table from "../../../../Table";
import { AddtionalCompensationForm } from "../../../../AdditionalCompensationForm";

const CompensationInfo = () => {
  const [compensationFormOpen, setCompensationFormOpen] = useState(false);

  const [compensationInfo, setcompensationInfo] = useState({
    basicSalaryAmount: "",
  });

  const [compensations, setCompensations] = useState([
    {
      compensation: "Housing Allowance",
      startdate: "01/01/2021",
      value: 1999.99,
      status: "ACTIVE",
    },
    {
      compensation: "Transposrtation Allowance",
      startdate: "01/01/2021",
      value: 1999.99,
      status: "INACTIVE",
    },
    {
      compensation: "General Allowance",
      startdate: "01/01/2021",
      value: 1999.99,
      status: "ACTIVE",
    },
  ]);

  const handleDelete = (targetIndex) => {
    setCompensations(compensations.filter((_, idx) => idx !== targetIndex));
  };

  const handleAdd = (newRow) => {
    setCompensations([...compensations, newRow]);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setcompensationInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      navigate("/compensationInfo");
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

  return (
    <div>
      <NavBar></NavBar>
      <div class={styles.form_compensationInfo}>
        <h2>Hire an Employee</h2>
        <h3>Compensation Info</h3>
        <form>
          <div>
            <label>
              Start Date<br></br>
              <input
                type="text"
                name="companyName"
                placeholder="Eg: Google"
                id="companyName"
                value={compensationInfo.companyName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Basic Salary<br></br>
              <input
                type="text"
                name="companyName"
                placeholder="Eg: Google"
                id="companyName"
                value={compensationInfo.basicSalaryAmount}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Annual Basic Salary<br></br>
              <input
                type="text"
                name="companyName"
                placeholder="Eg: Google"
                id="companyName"
                value={compensationInfo.basicSalaryAmount * 12}
                onChange={handleChange}
                required
                readOnly
              />
            </label>
          </div>
          <Table rows={compensations} deleteRow={handleDelete}></Table>
          <button onClick={() => setCompensationFormOpen(true)}>
            Add Compensation
          </button>
          {compensationFormOpen && (
            <AddtionalCompensationForm
              closeForm={() => setCompensationFormOpen(false)}
              onSubmit={handleAdd}
            ></AddtionalCompensationForm>
          )}
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

export default CompensationInfo;
