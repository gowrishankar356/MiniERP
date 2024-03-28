import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../ElementTable";
import styles from "./styles.module.css";
import Element from "../CreateElement";

export const ElementHomePage = () => {
  const [elements, setElements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [elementFormOpen, setElementFormOpen] = useState(false);
  const [element, setElement] = useState(null);
  const [search, setSearch] = useState({
    elementname: "",
    company: 0,
  });
  const [allElements, setAllElements] = useState([]);
  const searchFocus = useRef(null);

  const updateElement = (e) => {
    console.log(e);
    setElement(e);
    setElementFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    const updatedElements = elements?.map((element) =>
      element.elementid === updatedRow.elementid ? updatedRow : element
    );
    setElements(updatedElements);
  };

  const handleCreate = async (newRow) => {
    console.log(newRow);
    setElements((prevElements) => [...prevElements, newRow]);
    setElementFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    setElements(
      elements.filter((element) => element.elementid !== targetIndex)
    );
  };

  const handleSetElementForm = async (e) => {
    e.preventDefault();
    setElementFormOpen(true);
  };

  const closeForm = async (e) => {
    setElement(null);
    setElementFormOpen(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    // e.preventDefault();
    // console.log(allJobs);
    // setJobs(
    //   allJobs.filter((job) =>
    //     search.jobname.length > 0
    //       ? Number(search?.company) !== 0
    //         ? Number(search?.location) !== 0
    //           ? job.jobname
    //               .toLowerCase()
    //               .includes(search.jobname.toLowerCase()) &&
    //             Number(job.companyid) === Number(search.company) &&
    //             Number(job.locationid) === Number(search.location)
    //           : job.jobname
    //               .toLowerCase()
    //               .includes(search.jobname.toLowerCase()) &&
    //             Number(job.companyid) === Number(search.company)
    //         : Number(search?.location) !== 0
    //         ? job.jobname
    //             .toLowerCase()
    //             .includes(search.jobname.toLowerCase()) &&
    //           Number(job.locationid) === Number(search.location)
    //         : job.jobname.toLowerCase().includes(search.jobname.toLowerCase())
    //       : Number(search?.company) !== 0
    //       ? Number(search?.location) !== 0
    //         ? Number(job.companyid) === Number(search.company) &&
    //           Number(job.locationid) === Number(search.location)
    //         : Number(job.companyid) === Number(search.company)
    //       : Number(search?.location) !== 0
    //       ? Number(job.locationid) === Number(search.location)
    //       : true
    //   )
    // );
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
        const response = await axios.get(`http://localhost:3300/getelements`);
        setElements(response.data.rows);
        setAllElements(response.data.rows);
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
    <div className={styles.elementContainer}>
      <NavBar></NavBar>
      <div className={styles.elementHomePageContainer}>
        <h1>Manage Elements</h1>
        <div className={styles.elementSearchForm}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
            <label> Element Name</label>
            <input
              type="text"
              name="elementname"
              id="elementname"
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
        <div className={styles.elementSearchButtons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleRestet}>Reset</button>
        </div>
        <div className={styles.elementTable}>
          <button onClick={handleSetElementForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Element
          </button>
          <Table
            rows={elements}
            updateElement={updateElement}
            deleteElement={handleDelete}
          ></Table>
        </div>
        {elementFormOpen && (
          <div className={styles.elementFormComp}>
            <Element
              updateElement={element}
              onSubmit={handleCreate}
              closeForm={closeForm}
              onUpdate={handleUpdate}
            ></Element>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementHomePage;
