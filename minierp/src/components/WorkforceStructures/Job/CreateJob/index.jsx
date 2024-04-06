import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../NavBar";

const CreateJob = ({ updateJob, closeForm, onSubmit, onUpdate }) => {
  const [job, setJob] = useState({
    jobid: updateJob ? updateJob?.jobid : 0,
    jobname: updateJob ? updateJob?.jobname : "",
    companyid: updateJob ? updateJob?.companyid : 0,
    companyname: updateJob ? updateJob?.companyname : "",
    locationid: updateJob ? updateJob?.locationid : 0,
    locationname: updateJob ? updateJob?.locationname : "",
    datecreated: updateJob ? updateJob?.datecreated : Date(),
    createdby: updateJob ? updateJob?.createdby : 0,
    lastupdateddate: updateJob ? updateJob?.lastupdateddate : Date(),
    updatedby: updateJob ? updateJob?.updatedby : 0,
  });
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleChange = (e) => {
    setJob((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeLocation = (e) => {
    setJob((prev) => ({
      ...prev,
      locationid: e.target.value,
      locationname:
        e.target.options[e.target.selectedIndex].getAttribute("locationname"),
    }));
  };

  const handleChangeCompany = (e) => {
    setJob((prev) => ({
      ...prev,
      companyid: e.target.value,
      companyname:
        e.target.options[e.target.selectedIndex].getAttribute("companyname"),
    }));
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
      const res = await axios.post(`http://localhost:3300/createjob`, job);
      const locationid = job.locationid;
      const companyid = job.companyid;
      setJob((prev) => ({
        ...prev,
        jobid: res.data[0]?.jobid,
      }));
      onSubmit({
        ...job,
        locationid: Number(locationid),
        companyid: Number(companyid),
        jobid: res.data[0]?.jobid,
      });
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error adding Job. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3300/updateJob`, job);
      onUpdate(job);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error updating Job. Please try again.");
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
      <div className={styles.jobForm}>
        <h2>Create Job</h2>
        <form>
          <div className={styles.row}>
            <label>
              Job Name<br></br>
              <input
                type="text"
                name="jobname"
                id="jobname"
                value={job.jobname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company<br></br>
              <select
                id="companyid"
                name="companyid"
                value={job.companyid}
                required
                onChange={handleChangeCompany}
                companyname={job.companyname}
              >
                <option>Select Company</option>
                {companies.map((company) => (
                  <option
                    value={company.companyid}
                    id={company.companyid}
                    companyname={company.companyname}
                  >
                    {company.companyname}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Location<br></br>
            <select
              id="locationid"
              name="locationid"
              value={job.locationid}
              required
              onChange={handleChangeLocation}
              locationname={job.locationname}
            >
              <option>Select Company</option>
              {locations.map((location) => (
                <option
                  value={location.locationid}
                  id={location.locationid}
                  locationname={location.locationname}
                >
                  {location.locationname}
                </option>
              ))}
            </select>
          </label>
        </form>
        <div className={styles.buttons}>
          {updateJob ? (
            <button type="submit" onClick={handleUpdate}>
              Update Job
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Create Job
            </button>
          )}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
