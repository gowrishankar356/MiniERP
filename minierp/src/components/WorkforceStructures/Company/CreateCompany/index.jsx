import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../NavBar";

const Company = ({ updateCompany, closeForm, onSubmit }) => {
  const [company, setCompany] = useState({
    companyid: updateCompany ? updateCompany?.companyid : 0,
    companyname: updateCompany ? updateCompany?.companyname : "",
    locationid: updateCompany ? updateCompany?.locationid : 0,
    locationname: updateCompany ? updateCompany?.locationname : "",
    datecreated: updateCompany ? updateCompany?.datecreated : Date(),
    createdby: updateCompany ? updateCompany?.createdby : 0,
    lastupdateddate: updateCompany ? updateCompany?.lastupdateddate : Date(),
    updatedby: updateCompany ? updateCompany?.updatedby : 0,
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
      locationid: e.target.value,
      locationname:
        e.target.options[e.target.selectedIndex].getAttribute("locationname"),
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
      const res = await axios.post(
        `http://localhost:3300/createcompany`,
        company
      );
      const locationid = company.locationid;
      setCompany((prev) => ({
        ...prev,
        companyid: res.data[0]?.companyid,
      }));
      onSubmit({
        ...company,
        locationid: Number(locationid),
        companyid: res.data[0]?.companyid,
      });
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
                name="companyname"
                id="companyname"
                value={company.companyname}
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
                value={company.locationid}
                required
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option
                    key={location.locationid}
                    value={Number(location.locationid)}
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
