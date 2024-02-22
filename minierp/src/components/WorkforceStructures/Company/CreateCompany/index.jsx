import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../NavBar";

const Company = ({ updateCompany, closeForm, onSubmit }) => {
  const [company, setCompany] = useState({
    companyId: updateCompany ? updateCompany?.companyid : 0,
    companyName: updateCompany ? updateCompany?.companyname : "",
    locationId: updateCompany ? updateCompany?.locationid : 0,
    dateCreated: updateCompany ? updateCompany?.datecreated : Date(),
    createdBy: updateCompany ? updateCompany?.createdby : 0,
    lastUpdatedDate: updateCompany ? updateCompany?.lastupdateddate : Date(),
    updatedBy: updateCompany ? updateCompany?.updatedby : 0,
    locationName: updateCompany ? updateCompany?.locationname : "",
  });
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompany((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeLocation = (e) => {
    setCompany((prev) => ({
      ...prev,
      locationId: e.target.value,
      locationName:
        e.target.options[e.target.selectedIndex].getAttribute("locationName"),
    }));
    console.log(company);
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
      await axios.post(`http://localhost:3300/createcompany`, company);
      onSubmit(company);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error adding Company. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(company);
    try {
      await axios.put(`http://localhost:3300/updateCompany`, company);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error updating Company. Please try again.");
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
                onChange={handleChangeLocation}
                name="locationId"
                value={company.locationId}
                required
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option
                    key={location.locationid}
                    value={location.locationid}
                    locationName={location.locationname}
                  >
                    {location.locationname}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          {updateCompany ? (
            <button type="submit" onClick={handleUpdate}>
              Update Company
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Create Company
            </button>
          )}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Company;
