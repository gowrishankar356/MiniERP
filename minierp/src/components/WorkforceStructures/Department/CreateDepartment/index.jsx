import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles.module.css";
import NavBar from "../../../NavBar";

const CreateDepartment = ({
  updateDepartment,
  closeForm,
  onSubmit,
  onUpdate,
}) => {
  const [department, setDepartment] = useState({
    departmentid: updateDepartment ? updateDepartment?.departmentid : 0,
    departmentname: updateDepartment ? updateDepartment?.departmentname : "",
    companyid: updateDepartment ? updateDepartment?.companyid : 0,
    companyname: updateDepartment ? updateDepartment?.companyname : "",
    datecreated: updateDepartment ? updateDepartment?.datecreated : Date(),
    createdby: updateDepartment ? updateDepartment?.createdby : 0,
    lastupdateddate: updateDepartment
      ? updateDepartment?.lastupdateddate
      : Date(),
    updatedby: updateDepartment ? updateDepartment?.updatedby : 0,
  });
  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    setDepartment((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCompany = async (e) => {
    setDepartment((prev) => ({
      ...prev,
      companyid: e.target.value,
      companyname:
        e.target.options[e.target.selectedIndex].getAttribute("companyname"),
    }));
    console.log(department);
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
        `http://localhost:3300/createdepartment`,
        department
      );
      console.log(res.data);
      const companyid = department.companyid;
      setDepartment((prev) => ({
        ...prev,
        departmentid: res.data[0]?.departmentid,
      }));
      onSubmit({
        ...department,
        companyid: Number(companyid),
        departmentid: res.data[0]?.departmentid,
      });
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error adding Department. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3300/updateDepartment`, department);
      onUpdate(department);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error updating Department. Please try again.");
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
      <div className={styles.departmentForm}>
        <h2>Create Department</h2>
        <form>
          <div className={styles.row}>
            <label>
              Department Name<br></br>
              <input
                type="text"
                name="departmentname"
                id="departmentname"
                value={department.departmentname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company<br></br>
              <select
                id="companyid"
                name="companyid"
                value={department.companyid}
                required
                onChange={handleChangeCompany}
                companyname={department.companyname}
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
        </form>
        <div className={styles.buttons}>
          {updateDepartment ? (
            <button type="submit" onClick={handleUpdate}>
              Update Department
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Create Department
            </button>
          )}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
