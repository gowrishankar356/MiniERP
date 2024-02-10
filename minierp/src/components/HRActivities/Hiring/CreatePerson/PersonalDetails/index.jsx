import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../../NavBar";

const PersonalDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const personalDetailsBack = location.state?.personalDetails;

  const [personalDetails, setPersonalDetails] = useState({
    hireDate: personalDetailsBack?.hireDate ? personalDetailsBack.hireDate : "",
    companyId: personalDetailsBack?.companyId
      ? personalDetailsBack.companyId
      : 0,
    employeeType: personalDetailsBack?.employeeType
      ? personalDetailsBack.employeeType
      : "",
    title: personalDetailsBack?.title ? personalDetailsBack.title : "",
    firstName: personalDetailsBack?.firstName
      ? personalDetailsBack.firstName
      : "",
    lastName: personalDetailsBack?.lastName ? personalDetailsBack.lastName : "",
    gender: personalDetailsBack?.gender ? personalDetailsBack.gender : "",
    dob: personalDetailsBack?.dob ? personalDetailsBack.dob : "",
  });
  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      navigate("/demographicDetails", {
        state: { personalDetails: personalDetails },
      });
    } catch (error) {
      console.log(error);
      alert("Error navigating to Demographic Info form!");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getcompanies`);
        setCompanies(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
      <div className={styles.form_personal}>
        <h2>Hire an Employee</h2>
        <h3>Basic Details</h3>
        <form>
          <div className={styles.row}>
            <label>
              Hire Date<br></br>
              <input
                type="date"
                name="hireDate"
                id="hireDate"
                value={personalDetails.hireDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company<br></br>
              <select
                id="companyId"
                name="companyId"
                value={personalDetails.companyId}
                required
                onChange={handleChange}
              >
                <option value="0">Select Company</option>
                {companies.map((company) => (
                  <option key={company.companyid} value={company.companyid} id={company.companyid}>
                    {company.companyname}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
        <div className={styles.row}>
          <label>
            Employee Type<br></br>
            <select
              id="employeeType"
              onChange={handleChange}
              name="employeeType"
              value={personalDetails.employeeType}
              required
            >
              <option value="">Select Employee Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </select>
          </label>
        </div>
        <form>
          <h3>Personal Details</h3>
          <div className={styles.row}>
            <label>
              Title<br></br>
              <select
                id="title"
                onChange={handleChange}
                name="title"
                value={personalDetails.title}
                required
              >
                <option value="">Select Title</option>
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
                value={personalDetails.firstName}
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
                value={personalDetails.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Gender<br></br>
              <select
                id="gender"
                onChange={handleChange}
                name="gender"
                value={personalDetails.gender}
                required
              >
                <option value="">Select Gender</option>
                <option
                 value="MALE">
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
                value={personalDetails.dob}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
