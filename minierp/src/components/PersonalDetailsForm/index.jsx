import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from "./styles.module.css";
import NavBar from "../NavBar";

const PersonalDetailsForm = () => {
  const [persoanlDetails, setPersonalDetails] = useState({
    title: "mr",
    firstName: "",
    lastName: "",
    gender: "male",
    dob: "",
  });

  const navigate = useNavigate()


  const handleChange = (e) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(persoanlDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(persoanlDetails)
    try {
      await axios.post(
        `http://localhost:3300/person`,
        persoanlDetails
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding person. Please try again.");
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div class={styles.form_personal}>
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
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
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
                <option selected value="male">
                  Male
                </option>
                <option value="female">Female</option>
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
        <button type='submit' onClick = {handleSubmit} className={styles.logbutton}>Create Person</button>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
