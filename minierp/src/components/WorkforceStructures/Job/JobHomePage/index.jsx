import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../JobTable";
import styles from "./styles.module.css";
import Job from "../CreateJob";

export const JobHomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [search, setSearch] = useState({
    jobname: "",
    company: 0,
    location: 0,
  });
  const [allJobs, setAllJobs] = useState([]);

  const updateJob = (e) => {
    setJob(e);
    setJobFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    const updatedJobs = jobs?.map((job) =>
      job.jobid === updatedRow.jobid ? updatedRow : job
    );
    setJobs(updatedJobs);
  };

  const handleCreate = async (newRow) => {
    setJobs((prevJobs) => [...prevJobs, newRow]);
    setJobFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    setJobs(jobs.filter((job) => job.jobid !== targetIndex));
  };

  const handleSetJobForm = async (e) => {
    e.preventDefault();
    setJobFormOpen(true);
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
    console.log(allJobs);
    setJobs(
      allJobs.filter((job) =>
        search.jobname.length > 0
          ? Number(search?.company) !== 0
            ? job.jobname
                .toLowerCase()
                .includes(search.jobname.toLowerCase()) &&
              Number(job.companyid) === Number(search.company)
            : job.jobname.toLowerCase().includes(search.jobname.toLowerCase())
          : Number(search?.company) !== 0
          ? Number(job.companyid) === Number(search.company)
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getjobs`);
        setJobs(response.data.rows);
        setAllJobs(response.data.rows);
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
      <div className={styles.job_homepage_container}>
        <h1>Manage Jobs</h1>
        <div className={styles.searchform}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
            <label> Job Name</label>
            <input
              type="text"
              name="jobname"
              id="jobname"
              onChange={handleChange}
            ></input>
            <label> Company</label>
            <select name="company" id="company" onChange={handleChange}>
              <option value={0}>Select Company</option>
              {companies.map((company) => (
                <option value={Number(company.locationid)}>
                  {company.companyname}
                </option>
              ))}
            </select>
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
        <div className={styles.search_buttons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleRestet}>Reset</button>
        </div>
        <div className={styles.job_table}>
          <button onClick={handleSetJobForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Job
          </button>
          <Table
            rows={jobs}
            updateJob={updateJob}
            deleteJob={handleDelete}
          ></Table>
        </div>
        {jobFormOpen && (
          <Job
            updateJob={job}
            onSubmit={handleCreate}
            closeForm={closeForm}
            onUpdate={handleUpdate}
          ></Job>
        )}
      </div>
    </div>
  );
};

export default JobHomePage;
