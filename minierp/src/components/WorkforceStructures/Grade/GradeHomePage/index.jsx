import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../GradeTable";
import styles from "./styles.module.css";
import CreateGrade from "../CreateGrade";

export const GradeHomePage = () => {
  const [grades, setGrades] = useState([]);
  const [grade, setGrade] = useState(null);
  const [gradeFormOpen, setGradeFormOpen] = useState(false);
  const [search, setSearch] = useState({ locationname: "", country: "" });
  const [allGrades, setAllGrades] = useState([]);

  const updateGrade = (e) => {
    setGrade(e);
    setGradeFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    const updateGrades = grades.map((grade) =>
      grade.gradeid === updatedRow.gradeid ? updatedRow : grade
    );
    setGrades(updateGrades);
  };

  const handleCreate = async (newRow) => {
    setGrades((prevGrades) => [...prevGrades, newRow]);
    setGradeFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    setGrades((prevGrades) =>
      prevGrades.filter((grade) => grade.gradeid !== targetIndex)
    );
  };

  const handleSetGradeForm = async (e) => {
    e.preventDefault();
    setGradeFormOpen(true);
  };

  const closeForm = async (e) => {
    setGrade(null);
    setGradeFormOpen(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            updateGrade={updateGrade}
            deleteGrade={handleDelete}
          ></Table>
        </div>
        {gradeFormOpen && (
          <CreateGrade
            updateGrade={grade}
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
