import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../NavBar";

const Company = (props) => {
  console.log(props);
  const [company, setCompany] = useState({
    companyName: props.updateCompany ? props.updateCompany?.companyname : "",
    locationId: props.updateCompany ? props.updateCompany?.locationid : 0,
  });
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompany((prev) => ({
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
    console.log(company);
    try {
      await axios.post(`http://localhost:3300/createcompany`, company);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding Company. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getlocations`);
        setLocations(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.form_createCompany}>
        <h2>Create Company</h2>
        <form>
          <div className={styles.row}>
            <label>
              Company Name<br></br>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={company.companyName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location<br></br>
              <select
                id="locationId"
                onChange={handleChange}
                name="locationId"
                value={company.locationId}
                required
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location.locationid} value={location.locationid}>
                    {location.locationname}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          <button type="submit" onClick={handleSubmit}>
            Create Company
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Company;
