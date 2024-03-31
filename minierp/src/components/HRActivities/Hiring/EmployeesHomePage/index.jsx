import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../EmployeesTable";
import styles from "./styles.module.css";
// import Job from "../CreateJob";
import { useNavigate } from "react-router-dom";

export const EmployeesHomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [search, setSearch] = useState({
    jobname: "",
    company: 0,
    location: 0,
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const searchFocus = useRef(null);
  const navigate = useNavigate();

  const updateJob = (e) => {
    setJob(e);
    setJobFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    const updatedJobs = employees?.map((job) =>
      job.jobid === updatedRow.jobid ? updatedRow : job
    );
    setEmployees(updatedJobs);
  };

  const handleCreate = async (newRow) => {
    setEmployees((prevJobs) => [...prevJobs, newRow]);
    setJobFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    setEmployees(employees.filter((job) => job.jobid !== targetIndex));
  };

  const handleCreateEmployee = async (e) => {
    navigate("/personalDetails");
  };

  const closeForm = async (e) => {
    setJob(null);
    setJobFormOpen(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setEmployees(
      allEmployees.filter((job) =>
        search.jobname.length > 0
          ? Number(search?.company) !== 0
            ? Number(search?.location) !== 0
              ? job.jobname
                  .toLowerCase()
                  .includes(search.jobname.toLowerCase()) &&
                Number(job.companyid) === Number(search.company) &&
                Number(job.locationid) === Number(search.location)
              : job.jobname
                  .toLowerCase()
                  .includes(search.jobname.toLowerCase()) &&
                Number(job.companyid) === Number(search.company)
            : Number(search?.location) !== 0
            ? job.jobname
                .toLowerCase()
                .includes(search.jobname.toLowerCase()) &&
              Number(job.locationid) === Number(search.location)
            : job.jobname.toLowerCase().includes(search.jobname.toLowerCase())
          : Number(search?.company) !== 0
          ? Number(search?.location) !== 0
            ? Number(job.companyid) === Number(search.company) &&
              Number(job.locationid) === Number(search.location)
            : Number(job.companyid) === Number(search.company)
          : Number(search?.location) !== 0
          ? Number(job.locationid) === Number(search.location)
          : true
      )
    );
  };
  const handleRestet = async (e) => {
    // e.preventDefault();
    // setSearch({ company: "", location: 0 });
    // setCompanies(allCompanies);
  };

  useEffect(() => {
    searchFocus.current.focus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getEmployees`);
        setEmployees(response.data.rows);
        setAllEmployees(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
    <div className={styles.jobContainer}>
      <NavBar></NavBar>
      <div className={styles.jobHomePageContainer}>
        <h1>Manage Employees</h1>
        <div className={styles.jobSearchForm}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
            <label> Employee Name</label>
            <input
              type="text"
              name="employeename"
              id="employeename"
              onChange={handleChange}
              ref={searchFocus}
            ></input>
            <label> Company</label>
            <select name="company" id="company" onChange={handleChange}>
              <option value={0}>Select Company</option>
              {companies.map((company) => (
                <option value={Number(company.companyid)}>
                  {company.companyname}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className={styles.jobSearchButtons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleRestet}>Reset</button>
        </div>
        <div className={styles.jobTable}>
          <button onClick={handleCreateEmployee}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Employee
          </button>
          <Table
            rows={employees}
            updateJob={updateJob}
            deleteJob={handleDelete}
          ></Table>
        </div>
        {/* {jobFormOpen && (
          <div className={styles.jobFormComp}>
            <Job
              updateJob={job}
              onSubmit={handleCreate}
              closeForm={closeForm}
              onUpdate={handleUpdate}
            ></Job>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EmployeesHomePage;
