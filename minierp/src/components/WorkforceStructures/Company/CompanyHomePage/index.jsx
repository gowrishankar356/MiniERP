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
  const [allCompanies, setAllCompanies] = useState([]);

  const updateCompany = (e) => {
    setCompany(e);
    setCompanyFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    const updatedCompanies = companies?.map((company) =>
      company.companyid === updatedRow.companyid ? updatedRow : company
    );
    setCompanies(updatedCompanies);
  };

  const handleCreate = async (newRow) => {
    setCompanies((prevCompanies) => [...prevCompanies, newRow]);
    setCompanyFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    console.log(targetIndex);
    setCompanies(
      companies.filter((company) => company.companyid !== targetIndex)
    );
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
    e.preventDefault();
    setCompanies(
      allCompanies.filter((company) =>
        search.company.length > 0
          ? Number(search.location) !== 0
            ? company.companyname
                .toLowerCase()
                .includes(search.company.toLowerCase()) &&
              company.locationid === Number(search.location)
            : company.companyname
                .toLowerCase()
                .includes(search.company.toLowerCase())
          : Number(search.location) !== 0
          ? company.locationid === Number(search.location)
          : true
      )
    );
  };
  const handleRestet = async (e) => {
    e.preventDefault();
    setSearch({ company: "", location: 0 });
    setCompanies(allCompanies);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/getallcompanies`
        );
        setCompanies(response.data.rows);
        setAllCompanies(response.data.rows);
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
    <div className={styles.container}>
      <NavBar></NavBar>
      <div className={styles.companyHomePageContainer}>
        <h1>Manage Companies</h1>
        <div className={styles.companySearchForm}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
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
                <option value={Number(location.locationid)}>
                  {location.locationname}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className={styles.companySearchButtons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleRestet}>Reset</button>
        </div>
        <div className={styles.companyTable}>
          <button onClick={handleSetCompanyForm}>
            <h3>
              <b>+</b>
            </h3>
            Create Company
          </button>
          <Table
            rows={companies}
            updateCompany={updateCompany}
            deleteCompany={handleDelete}
          ></Table>
        </div>
        {companyFormOpen && (
          <div className={styles.form}>
            <Company
              updateCompany={company}
              onSubmit={handleCreate}
              closeForm={closeForm}
              onUpdate={handleUpdate}
            ></Company>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyHomePage;
