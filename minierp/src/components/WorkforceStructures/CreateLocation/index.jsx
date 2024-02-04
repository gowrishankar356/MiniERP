import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../NavBar";

const CreateLocation = () => {
  const [location, setLocation] = useState({
    locationName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "UNITED_STATES",
    postalCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLocation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(setLocation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate("/compensationInfo");
    } catch (error) {
      console.log(error);
      alert("Error navigating to Compensation Info form!");
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
      <div class={styles.form_createLocation}>
        <h2>Create Location</h2>
        <form>
          <div>
            <label>
              Location<br></br>
              <input
                type="text"
                name="locationName"
                id="locationName"
                value={location.locationName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div class={styles.row}>
            <label>
              Address Line 1<br></br>
              <input
                type="addressLine1"
                name="addressLine1"
                id="addressLine1"
                value={location.addressLine1}
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
                value={location.addressLine1}
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
                value={location.city}
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
                value={location.state}
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
                value={location.country}
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
                value={location.postalCode}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div class={styles.buttons}>
          <button type="submit" onClick={handleSubmit}>
            Create Location
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateLocation;
