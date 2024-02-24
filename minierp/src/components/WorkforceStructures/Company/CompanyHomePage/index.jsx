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
  const [search, setSearch] = useState({ company: "", location: 0 });

  const updateCompany = (e) => {
    setCompany(e);
    setCompanyFormOpen(true);
  };

  const handleCreate = async (newRow) => {
    setCompanies((prevCompanies) => [...prevCompanies, newRow]);
    setCompanyFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    console.log(targetIndex);
    setCompanies(companies.filter((_, idx) => idx !== targetIndex));
  };

  const handleSetCompanyForm = async (e) => {
    e.preventDefault();
    setCompanyFormOpen(true);
  };

  const closeForm = async (e) => {
    setCompany(null);
    setCompanyFormOpen(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    setCompanies(
      companies.filter((company) =>
        search.company || search.company === ""
          ? company.companyname
              .toLowerCase()
              .includes(search.company.toLowerCase())
          : true
      )
    );
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
      <div className={styles.company_homepage_container}>
        <h1>Manage Companies</h1>
        <div className={styles.searchform}>
          <form>
            <label> Company Name</label>
            <input
              type="text"
              name="company"
              id="name"
              onChange={handleChange}
            ></input>
            <label> Location</label>
            <select name="location" id="location" onChange={handleChange}>
              <option value={0}>Select Location</option>
              {locations.map((location) => (
                <option value={location.locationid}>
                  {location.locationname}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className={styles.search}>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.company_table}>
          <button onClick={handleSetCompanyForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Company
          </button>
          <Table
            rows={companies}
            updateCompany={updateCompany}
            deleteCompany={handleDelete}
          ></Table>
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
