import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../../NavBar";

const EmploymentInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const personalDetails = location.state?.personalDetails;
  const demographicDetails = location.state?.demographicDetails;
  const employmentDetailsBack = location.state?.employmentDetailsBack;
  const [employmentInfo, setemploymentInfo] = useState({
    jobId: employmentDetailsBack?.jobId ? employmentDetailsBack.jobId : 0,
    gradeId: employmentDetailsBack?.gradeId ? employmentDetailsBack.gradeId : 0,
    departmentId: employmentDetailsBack?.departmentId
      ? employmentDetailsBack.departmentId
      : 0,
    locationId: employmentDetailsBack?.locationId
      ? employmentDetailsBack.locationId
      : 0,
    managerId: employmentDetailsBack?.managerId
      ? employmentDetailsBack.managerId
      : 0,
  });

  const [jobs, setJobs] = useState([]);
  const [grades, setGrades] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [managers, setManagers] = useState([]);

  const handleChange = (e) => {
    setemploymentInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      navigate("/compensationDetails", {
        state: {
          personalDetails: personalDetails,
          demographicDetails: demographicDetails,
          employmentDetails: employmentInfo,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Error navigating to Compensation Info form!");
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      navigate("/demographicDetails", {
        state: {
          personalDetails: personalDetails,
          demographicDetails: demographicDetails,
        },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getjobs`);
        setJobs(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getgrades`);
        setGrades(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/getdepartments`
        );
        setDepartments(response.data.rows);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getpersons`);
        setManagers(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.form_employmentInfo}>
        <h2>Hire an Employee</h2>
        <h3>Employment Info</h3>
        <form>
          <div className={styles.row}>
            <label>
              Job<br></br>
              <select
                id="jobId"
                name="jobId"
                value={employmentInfo.jobId}
                required
                onChange={handleChange}
              >
                <option value="0">Select Job</option>
                {jobs.map((job) => (
                  <option key={job.jobid} value={job.jobid} id={job.jobid}>
                    {job.jobname}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Grade<br></br>
              <select
                id="gradeId"
                name="gradeId"
                value={employmentInfo.gradeId}
                required
                onChange={handleChange}
              >
                <option value="0">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade.gradeid} value={grade.gradeid} id={grade.gradeid}>
                    {grade.gradename}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Department<br></br>
              <select
                id="departmentId"
                name="departmentId"
                value={employmentInfo.departmentId}
                required
                onChange={handleChange}
              >
                <option value="0">Select Department</option>
                {departments.map((department) => (
                  <option key={department.departmentid} value={department.departmentid} id={department.departmentid}>
                    {department.departmentname}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Job Location<br></br>
              <select
                id="locationId"
                name="locationId"
                value={employmentInfo.locationId}
                required
                onChange={handleChange}
              >
                <option value="0">Select Location</option>
                {locations.map((location) => (
                  <option key={location.locationid} value={location.locationid} id={location.locationid}>
                    {location.locationname}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Manager<br></br>
              <select
                id="managerId"
                name="managerId"
                value={employmentInfo.managerId}
                required
                onChange={handleChange}
              >
                <option value="0">Select Manager</option>
                {managers.map((manager) => (
                  <option key={manager.personid} value={manager.personid} id={manager.personid}>
                    {manager.personid}
                  </option>
                ))}
              </select>
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

export default EmploymentInfo;
