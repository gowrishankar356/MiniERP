import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../GradeTable";
import styles from "./styles.module.css";
import CreateGrade from "../CreateGrade";

export const GradeHomePage = () => {
  const [grades, setGrades] = useState([]);
  const [gradeFormOpen, setGradeFormOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState({ locationname: "", country: "" });
  const [allGrades, setAllGrades] = useState([]);

  const updateLocation = (e) => {
    //   setLocation(e);
    //   setLocationFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    // const updateGrades = grades.map((grade) =>
    //   grade.gradeId === updatedRow.gradeId ? updatedRow : grade
    // );
    // setGrades(updateGrades);
  };

  const handleCreate = async (newRow) => {
    // setLocations((prevLocations) => [...prevLocations, newRow]);
    // setLocationFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    // setLocations((prevLocations) =>
    //   prevLocations.filter((location) => location.locationid !== targetIndex)
    // );
  };

  const handleSetGradeForm = async (e) => {
    e.preventDefault();
    setGradeFormOpen(true);
  };

  const closeForm = async (e) => {
    // setLocation(null);
    // setLocationFormOpen(false);
  };

  const handleChange = (e) => {
    // setSearch((prev) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    // }));
  };

  const handleSearch = async (e) => {
    // e.preventDefault();
    // setLocations(
    //   allLocations.filter((location) =>
    //     search.locationname.length > 0
    //       ? search.country !== ""
    //         ? location.locationname
    //             .toLowerCase()
    //             .includes(search.locationname.toLowerCase()) &&
    //           location.country === search.country
    //         : location.locationname
    //             .toLowerCase()
    //             .includes(search.locationname.toLowerCase())
    //       : search.country !== ""
    //       ? location.country === search.country
    //       : true
    //   )
    // );
  };

  const handleReset = async (e) => {
    // e.preventDefault();
    // setSearch({ company: "", location: 0 });
    // setLocations(allLocations);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getgrades`);
        setGrades(response.data.rows);
        setAllGrades(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.grade_homepage_container}>
        <h1>Manage Grades</h1>
        <div className={styles.searchform}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
            <label> Grade Name</label>
            <input
              type="text"
              name="locationname"
              id="locationname"
              onChange={handleChange}
            ></input>
          </form>
        </div>
        <div className={styles.search_buttons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.grade_table}>
          <button onClick={handleSetGradeForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Grade
          </button>
          <Table
            rows={grades}
            updateLocation={updateLocation}
            deleteLocation={handleDelete}
          ></Table>
        </div>
        {gradeFormOpen && (
          <CreateGrade
            updateLocation={location}
            onSubmit={handleCreate}
            onUpdate={handleUpdate}
            closeForm={closeForm}
          ></CreateGrade>
        )}
      </div>
    </div>
  );
};

export default GradeHomePage;
