import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../CompanyTable";
import styles from "./styles.module.css";
import Company from "../CreateCompany";

export const CompanyHomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companyFormOpen, setCompanyFormOpen] = useState(false);
  const [company, setCompany] = useState(null);

  const updateCompany = (e) => {
    setCompany(e);
    setCompanyFormOpen(true);
  };

  const handleCreate = (newRow) => {
    setCompanyFormOpen(false);
  };

  const handleSetCompanyForm = (e) => {
    e.preventDefault();
    setCompanyFormOpen(true);
  };

  const closeForm = (e) => {
    setCompany(null);
    setCompanyFormOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/getallcompanies`
        );
        setCompanies(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [companyFormOpen]);

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
      <div className={styles.company_homepage_container}>
        <h1>Manage Companies</h1>
        <div className={styles.searchform}>
          <form>
            <formitem>
              <label> Company Name</label>
              <input type="text"></input>
            </formitem>
            <formitem>
              <label> Location</label>
              <select>
                <option value={0}>Select Location</option>
                {locations.map((location) => (
                  <option value={location.locationid}>
                    {location.locationname}
                  </option>
                ))}
              </select>
            </formitem>
          </form>
        </div>
        <div className={styles.company_table}>
          <button onClick={handleSetCompanyForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Company
          </button>
          <Table rows={companies} updateCompany={updateCompany}></Table>
        </div>
        {companyFormOpen && (
          <Company
            updateCompany={company}
            onSubmit={handleCreate}
            closeForm={closeForm}
          ></Company>
        )}
      </div>
    </div>
  );
};

export default CompanyHomePage;
