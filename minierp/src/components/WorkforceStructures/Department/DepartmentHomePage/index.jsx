import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../DepartmentTable";
import styles from "./styles.module.css";
import CreateDepartment from "../CreateDepartment";

export const DepartmentHomePage = () => {
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departmentFormOpen, setDepartmentFormOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [search, setSearch] = useState({ departmentname: "", company: 0 });
  const [allDepartments, setAllDepartments] = useState([]);

  const updateDepartment = (e) => {
    setDepartment(e);
    setDepartmentFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    const updateDepartments = departments.map((department) =>
      department.departmentid === updatedRow?.departmentid
        ? updatedRow
        : department
    );
    setDepartments(updateDepartments);
  };

  const handleCreate = async (newRow) => {
    console.log(newRow);
    setDepartments((prevDepartments) => [...prevDepartments, newRow]);
    setDepartmentFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter(
        (department) => department.departmentid !== targetIndex
      )
    );
  };

  const handleSetDepartmentForm = async (e) => {
    e.preventDefault();
    setDepartmentFormOpen(true);
  };

  const closeForm = async (e) => {
    setDepartment(null);
    setDepartmentFormOpen(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setDepartments(
      allDepartments.filter((department) =>
        search.departmentname.length > 0
          ? Number(search?.company) !== 0
            ? department.departmentname
                .toLowerCase()
                .includes(search.departmentname.toLowerCase()) &&
              Number(department.companyid) === Number(search.company)
            : department.departmentname
                .toLowerCase()
                .includes(search.departmentname.toLowerCase())
          : Number(search?.company) !== 0
          ? Number(department.companyid) === Number(search.company)
          : true
      )
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setSearch({ departmentname: "", company: 0 });
    setAllDepartments(allDepartments);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/getdepartments`
        );
        setDepartments(response.data.rows);
        setAllDepartments(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getCompanies`);
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
      <div className={styles.department_homepage_container}>
        <h1>Manage Locations</h1>
        <div className={styles.searchform}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
            <label> Department Name</label>
            <input
              type="text"
              name="departmentname"
              id="departmentname "
              onChange={handleChange}
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
        <div className={styles.search_buttons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.department_table}>
          <button onClick={handleSetDepartmentForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Department
          </button>
          <Table
            rows={departments}
            updateDepartment={updateDepartment}
            deleteDepartment={handleDelete}
          ></Table>
        </div>
        {departmentFormOpen && (
          <CreateDepartment
            updateDepartment={department}
            onSubmit={handleCreate}
            onUpdate={handleUpdate}
            closeForm={closeForm}
          ></CreateDepartment>
        )}
      </div>
    </div>
  );
};

export default DepartmentHomePage;
