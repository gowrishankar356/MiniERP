import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../NavBar";

const CreateElement = () => {
  const [element, setElement] = useState({
    elementName: "",
    elementType: "",
    periodicity: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setElement((prev) => ({
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
      await axios.post(`http://localhost:3300/createelement`, element);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error adding Element. Please try again.");
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
      <div className={styles.form_element}>
        <h2>Create Element</h2>
        <form>
          <div className={styles.row}>
            <label>
              Element Name<br></br>
              <input
                type="text"
                name="elementName"
                id="elementName"
                value={element.elementName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Element Type<br></br>
              <select
                id="elementType"
                name="elementType"
                value={element.elementType}
                onChange={handleChange}
              >
                <option value="">Select Element Type</option>
                <option value="STD_ERR">Standard Earnings</option>
                <option value="SUP_ERR">Supplement Earnings</option>
                <option value="VOL_DED">Voluntary Deductions</option>
                <option value="INVOL_DED">Involuntary Deductions</option>
              </select>
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Company<br></br>
              <select
                id="companyId"
                name="companyId"
                value={element.companyId}
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
            <label>
              Periodicity<br></br>
              <select
                id="periodicity"
                name="periodicity"
                value={element.periodicity}
                onChange={handleChange}
              >
                <option value="">Select Periodicity of Element</option>
                <option value="R">Recurring</option>
                <option value="NR">Non Recurring</option>
              </select>
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          <button type="submit" onClick={handleSubmit}>
            Create Element
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateElement;
