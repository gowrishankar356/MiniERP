import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../GradeTable";
import styles from "./styles.module.css";
import CreateGrade from "../CreateGrade";

export const GradeHomePage = () => {
  const [gad, setGrades] = useState([]);
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
    e.preventDefault();
    setGrades(
      allGrades.filter((grade) =>
        search.gradename.length > 0
          ? grade.gradename
              .toLowerCase()
              .includes(search.gradename.toLowerCase())
          : true
      )
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setSearch({ gradename: "" });
    setGrades(allGrades);
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
    <div className={styles.gradeContainer}>
      <NavBar></NavBar>
      <div className={styles.grade_homepage_container}>
        <h1>Manage Grades</h1>
        <div className={styles.gradeSearchForm}>
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
              name="gradename"
              id="gradename"
              onChange={handleChange}
            ></input>
          </form>
        </div>
        <div className={styles.gradeSearchButtons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.gradeTable}>
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
          <div className={styles.gradeForm}>
            <CreateGrade
              updateGrade={grade}
              onSubmit={handleCreate}
              onUpdate={handleUpdate}
              closeForm={closeForm}
            ></CreateGrade>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeHomePage;
