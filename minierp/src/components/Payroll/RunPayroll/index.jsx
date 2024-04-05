import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./styles.module.css";

const CreateElement = ({ updateElement, closeForm, onSubmit, onUpdate }) => {
  const [element, setElement] = useState({
    elementid: updateElement ? updateElement?.elementid : 0,
    elementname: updateElement ? updateElement?.elementname : "",
    elementtype: updateElement ? updateElement.elementtype : "",
    periodicity: updateElement ? updateElement.periodicity : "",
    companyid: updateElement ? updateElement.companyid : 0,
    companyname: updateElement ? updateElement.companyname : 0,
    datecreated: updateElement ? updateElement?.datecreated : Date(),
    createdby: updateElement ? updateElement?.createdby : 0,
    lastupdateddate: updateElement ? updateElement?.lastupdateddate : Date(),
    updatedby: updateElement ? updateElement?.updatedby : 0,
  });

  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    setElement((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCompany = (e) => {
    setElement((prev) => ({
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
      const res = await axios.post(
        `http://localhost:3300/createelement`,
        element
      );
      const companyid = element.companyid;
      setElement((prev) => ({
        ...prev,
        elementid: res.data[0]?.elementid,
      }));
      onSubmit({
        ...element,
        companyid: Number(companyid),
        elementid: res.data[0]?.elementid,
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
      await axios.put(`http://localhost:3300/updateElement`, element);
      onUpdate(element);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error updating Element. Please try again.");
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
      <div className={styles.elementForm}>
        <h2>Create Element</h2>
        <form>
          <div className={styles.row}>
            <label>
              Element Name<br></br>
              <input
                type="text"
                name="elementname"
                id="elementname"
                value={element.elementname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Element Type<br></br>
              <select
                id="elementtype"
                name="elementtype"
                value={element.elementtype}
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
                id="companyid"
                name="companyid"
                value={element.companyid}
                required
                onChange={handleChangeCompany}
                companyname={element.companyname}
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
          {updateElement ? (
            <button type="submit" onClick={handleUpdate}>
              Update Element
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Create Element
            </button>
          )}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateElement;
