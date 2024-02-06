import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../../NavBar";

const DemographicInfo = () => {
  const [demographicInfo, setdemographicInfo] = useState({
    citizenship: "",
    citizenshipStatus: "",
    maritalStatus: "SINGLE",
    email: "",
    countryCode: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const personalDetails = location.state?.personalDetails;
  const demographicDetails = location.state?.demographicDetails;

  const handleChange = (e) => {
    setdemographicInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      navigate("/employmentInfo", {
        state: {
          personalDetails: personalDetails,
          demographicDetails: demographicInfo,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Error navigating to Employment Info form!");
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      navigate("/personalDetails", {
        state: { personalDetails: personalDetails },
      });
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
      <div class={styles.form_legislativeContactInfo}>
        <h2>Hire an Employee</h2>
        <h3>Citizenship Info</h3>
        <form>
          <div class={styles.row}>
            <label>
              Citizenship<br></br>
              <input
                type="text"
                name="citizenship"
                id="citizenship"
                value={
                  demographicDetails?.citizenship
                    ? demographicDetails.citizenship
                    : demographicInfo.citizenship
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Citizenship Status<br></br>
              <select
                id="citizenshipStatus"
                onChange={handleChange}
                name="citizenshipStatus"
                value={
                  demographicDetails?.citizenshipStatus
                    ? demographicDetails.citizenshipStatus
                    : demographicInfo.citizenshipStatus
                }
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </label>
          </div>
        </form>
        <form>
          <label>
            Marital Status<br></br>
            <select
              id="maritalStatus"
              onChange={handleChange}
              name="maritalStatus"
              value={
                demographicDetails?.maritalStatus
                  ? demographicDetails.maritalStatus
                  : demographicInfo.maritalStatus
              }
              required
            >
              <option value="MARRIED">Married</option>
              <option value="SINGLE">Single</option>
            </select>
          </label>
        </form>
        <form>
          <h3>Contact Info</h3>
          <div class={styles.row}>
            <label>
              Email<br></br>
              <input
                type="email"
                name="email"
                id="email"
                value={
                  demographicDetails?.email
                    ? demographicDetails.email
                    : demographicInfo.email
                }
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div class={styles.row}>
            <label>
              Country Code<br></br>
              <input
                type="countryCode"
                name="countryCode"
                id="countryCode"
                value={
                  demographicDetails?.countryCode
                    ? demographicDetails.countryCode
                    : demographicInfo.countryCode
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone Number<br></br>
              <input
                type="phoneNumber"
                name="phoneNumber"
                id="phoneNumber"
                value={
                  demographicDetails?.phoneNumber
                    ? demographicDetails.phoneNumber
                    : demographicInfo.phoneNumber
                }
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <h4>Address Info</h4>
          <div class={styles.row}>
            <label>
              Address Line 1<br></br>
              <input
                type="addressLine1"
                name="addressLine1"
                id="addressLine1"
                value={
                  demographicDetails?.addressLine1
                    ? demographicDetails.addressLine1
                    : demographicInfo.addressLine1
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Address Line 2<br></br>
              <input
                type="addressLine2"
                name="addressLine2"
                id="addressLine2"
                value={
                  demographicDetails?.addressLine2
                    ? demographicDetails.addressLine2
                    : demographicInfo.addressLine1
                }
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div class={styles.row}>
            <label>
              City<br></br>
              <input
                type="city"
                name="city"
                id="city"
                value={
                  demographicDetails?.city
                    ? demographicDetails.city
                    : demographicInfo.city
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              State<br></br>
              <input
                type="state"
                name="state"
                id="state"
                value={
                  demographicDetails?.state
                    ? demographicDetails.state
                    : demographicInfo.state
                }
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div class={styles.row}>
            <label>
              Country<br></br>
              <input
                type="country"
                name="country"
                id="country"
                value={
                  demographicDetails?.country
                    ? demographicDetails.country
                    : demographicInfo.country
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Postal Code<br></br>
              <input
                type="postalCode"
                name="postalCode"
                id="postalCode"
                value={
                  demographicDetails?.postalCode
                    ? demographicDetails.postalCode
                    : demographicInfo.postalCode
                }
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

export default DemographicInfo;
