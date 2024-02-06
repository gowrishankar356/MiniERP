import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../NavBar";

const CreateJob = () => {
  const [job, setJob] = useState({
    jobName: "",
    companyId: 0,
  });
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob((prev) => ({
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
    try {
      await axios.post(`http://localhost:3300/createJob`, job);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding Job. Please try again.");
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

  return (
    <div>
      <NavBar></NavBar>
      <div class={styles.form_createjob}>
        <h2>Create Location</h2>
        <form>
          <div class={styles.row}>
            <label>
              Job Name<br></br>
              <input
                type="text"
                name="jobName"
                id="jobName"
                value={job.jobName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company<br></br>
              <select
                id="companyId"
                name="companyId"
                value={job.companyId}
                required
                onChange={handleChange}
              >
                <option>Select Company</option>
                {companies.map((company) => (
                  <option value={company.companyid} id={company.companyid}>
                    {company.companyname}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
        <div class={styles.buttons}>
          <button type="submit" onClick={handleSubmit}>
            Create Job
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
