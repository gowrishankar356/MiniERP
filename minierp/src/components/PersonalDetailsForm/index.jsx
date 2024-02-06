import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../NavBar";

const PersonalDetailsForm = () => {
  const [persoanlDetails, setPersonalDetails] = useState({
    hireDate: "",
    companyName: "",
    employeeType: "FULL_TIME",
    title: "MR",
    firstName: "",
    lastName: "",
    gender: "MALE",
    dob: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      navigate("/legislativeContactInfo");
    } catch (error) {
      console.log(error);
      alert("Error navigating to Citizenship Info form!");
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

  // Initial Submit Configuration
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(persoanlDetails);
  //   try {
  //     await axios.post(`http://localhost:3300/person`, persoanlDetails);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error adding person. Please try again.");
  //   }
  // };

  return (
    <div>
      <NavBar></NavBar>
      <div class={styles.form_personal}>
        <h2>Hire an Employee</h2>
        <h3>Basic Details</h3>
        <form>
          <div class={styles.row}>
            <label>
              Hire Date<br></br>
              <input
                type="date"
                name="hireDate"
                id="hireDate"
                value={persoanlDetails.hireDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company Name<br></br>
              <input
                type="text"
                name="companyName"
                placeholder="Eg: Google"
                id="companyName"
                value={persoanlDetails.companyName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div class={styles.row}>
          <label>
            Employee Type<br></br>
            <select
              id="employeeType"
              onChange={handleChange}
              name="employeeType"
              value={persoanlDetails.employeeType}
              required
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </select>
          </label>
        </div>
        <form>
          <h3>Personal Details</h3>
          <div class={styles.row}>
            <label>
              Title<br></br>
              <select
                id="title"
                onChange={handleChange}
                name="title"
                value={persoanlDetails.title}
                required
              >
                <option value="MR">Mr.</option>
                <option value="MRS">Mrs.</option>
                <option value="MS">Ms.</option>
              </select>
            </label>
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                placeholder="Eg: John"
                id="firstName"
                value={persoanlDetails.firstName}
                onChange={handleChange}
                required
              />
            </label> 
            <label>
              Last Name
              <input
                type="text"
                name="lastName"
                placeholder="Eg: Wick"
                id="lastName"
                value={persoanlDetails.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div class={styles.row}>
            <label>
              Gender<br></br>
              <select
                id="gender"
                onChange={handleChange}
                name="gender"
                value={persoanlDetails.gender}
                required
              >
                <option selected value="MALE">
                  Male
                </option>
                <option value="FEMALE">Female</option>
              </select>
            </label>
            <label>
              Date of Birth<br></br>
              <input
                type="date"
                name="dob"
                id="dob"
                value={persoanlDetails.dob}
                onChange={handleChange}
                required
              />
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

export default PersonalDetailsForm;
