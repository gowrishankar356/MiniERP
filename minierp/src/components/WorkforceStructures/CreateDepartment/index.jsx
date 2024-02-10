import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../NavBar";

const CreateDepartment = () => {
  const [department, setDepartment] = useState({
    departmentName: "",
    companyId: 0,
  });
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDepartment((prev) => ({
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
      await axios.post(`http://localhost:3300/createdepartment`, department);
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
      <div className={styles.form_createdepartment}>
        <h2>Create Location</h2>
        <form>
          <div className={styles.row}>
            <label>
              Department Name<br></br>
              <input
                type="text"
                name="departmentName"
                id="departmentName"
                value={department.departmentName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company<br></br>
              <select
                id="companyId"
                name="companyId"
                value={department.companyId}
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
        <div className={styles.buttons}>
          <button type="submit" onClick={handleSubmit}>
            Create Department
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
