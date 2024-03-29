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
    periodicity: "",
    elementtype: "",
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
    e.preventDefault();
    setElements(
      allElements.filter((element) =>
        search.elementname.length > 0
          ? Number(search?.company) !== 0
            ? search?.elementtype.length > 0
              ? element.elementname
                  .toLowerCase()
                  .includes(search.elementname.toLowerCase()) &&
                Number(element.companyid) === Number(search.company) &&
                element.elementtype
                  .toLowerCase()
                  .includes(search.elementtype.toLowerCase())
              : element.elementname
                  .toLowerCase()
                  .includes(search.element.toLowerCase()) &&
                Number(element.companyid) === Number(search.company)
            : search?.elementtype.length > 0
            ? element.elementname
                .toLowerCase()
                .includes(search.elementname.toLowerCase()) &&
              element.elementype
                .toLowerCase()
                .includes(search.elementtype.toLowerCase())
            : element.elementname
                .toLowerCase()
                .includes(search.elementname.toLowerCase())
          : Number(search?.company) !== 0
          ? search?.elementtype.length > 0
            ? Number(element.companyid) === Number(search.company) &&
              element.elementype
                .toLowerCase()
                .includes(search.elementype.toLowerCase())
            : Number(element.companyid) === Number(search.company)
          : search?.elementtype.length > 0
          ? element.elementype
              .toLowerCase()
              .includes(search.elementype.toLowerCase())
          : true
      )
    );
  };
  const handleRestet = async (e) => {
    e.preventDefault();
    setSearch({
      elementname: "",
      company: 0,
      periodicity: "",
      elementtype: "",
    });
    setCompanies(allElements);
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
              value={search.elementname}
              ref={searchFocus}
            ></input>
            <label> Company</label>
            <select
              name="company"
              id="company"
              onChange={handleChange}
              value={search.company}
            >
              <option value={0}>Select Company</option>
              {companies.map((company) => (
                <option value={Number(company.companyid)}>
                  {company.companyname}
                </option>
              ))}
            </select>
            <label>
              Periodicity<br></br>
              <select
                id="periodicity"
                name="periodicity"
                value={search.periodicity}
                onChange={handleChange}
              >
                <option value="">Select Periodicity of Element</option>
                <option value="R">Recurring</option>
                <option value="NR">Non Recurring</option>
              </select>
            </label>
            <label>
              Element Type<br></br>
              <select
                id="elementtype"
                name="elementtype"
                value={search.elementtype}
                onChange={handleChange}
              >
                <option value="">Select Element Type</option>
                <option value="STD_ERR">Standard Earnings</option>
                <option value="SUP_ERR">Supplement Earnings</option>
                <option value="VOL_DED">Voluntary Deductions</option>
                <option value="INVOL_DED">Involuntary Deductions</option>
              </select>
            </label>
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
