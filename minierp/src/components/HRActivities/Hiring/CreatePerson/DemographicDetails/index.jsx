import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../../NavBar";

const DemographicInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const personalDetails = location.state?.personalDetails;
  const demographicDetails = location.state?.demographicDetails;
  const [demographicInfo, setdemographicInfo] = useState({
    citizenship: demographicDetails?.citizenship
      ? demographicDetails.citizenship
      : "",
    citizenshipStatus: demographicDetails?.citizenshipStatus
      ? demographicDetails.citizenship
      : "",
    maritalStatus: demographicDetails?.maritalStatus
      ? demographicDetails.maritalStatus
      : "",
    email: demographicDetails?.email ? demographicDetails.email : "",
    countryCode: demographicDetails?.countryCode
      ? demographicDetails.countryCode
      : "",
    phoneNumber: demographicDetails?.phoneNumber
      ? demographicDetails.phoneNumber
      : "",
    addressLine1: demographicDetails?.addressLine1
      ? demographicDetails.addressLine1
      : "",
    addressLine2: demographicDetails?.addressLine2
      ? demographicDetails.addressLine2
      : "",
    city: demographicDetails?.city ? demographicDetails.city : "",
    state: demographicDetails?.state ? demographicDetails.state : "",
    country: demographicDetails?.country ? demographicDetails.country : "",
    postalCode: demographicDetails?.postalCode
      ? demographicDetails.postalcode
      : "",
  });

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
      <div className={styles.form_legislativeContactInfo}>
        <h2>Hire an Employee</h2>
        <h3>Citizenship Info</h3>
        <form>
          <div className={styles.row}>
            <label>
              Citizenship<br></br>
              <input
                type="text"
                name="citizenship"
                id="citizenship"
                value={demographicInfo.citizenship}
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
                value={demographicInfo.citizenshipStatus}
                required
              >
                <option value="">Select Citizeship Status</option>
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
              value={demographicInfo.maritalStatus}
              required
            >
              <option value="">Select Marital Status</option>
              <option value="MARRIED">Married</option>
              <option value="SINGLE">Single</option>
            </select>
          </label>
        </form>
        <form>
          <h3>Contact Info</h3>
          <div className={styles.row}>
            <label>
              Email<br></br>
              <input
                type="email"
                name="email"
                id="email"
                value={demographicInfo.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Country Code<br></br>
              <input
                type="countryCode"
                name="countryCode"
                id="countryCode"
                value={demographicInfo.countryCode}
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
                value={demographicInfo.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <h4>Address Info</h4>
          <div className={styles.row}>
            <label>
              Address Line 1<br></br>
              <input
                type="addressLine1"
                name="addressLine1"
                id="addressLine1"
                value={demographicInfo.addressLine1}
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
                value={demographicInfo.addressLine2}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              City<br></br>
              <input
                type="city"
                name="city"
                id="city"
                value={demographicInfo.city}
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
                value={demographicInfo.state}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Country<br></br>
              <input
                type="country"
                name="country"
                id="country"
                value={demographicInfo.country}
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
                value={demographicInfo.postalCode}
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

export default DemographicInfo;
