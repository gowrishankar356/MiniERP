import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import axios from "axios";
import Table from "../LocationTable";
import styles from "./styles.module.css";
import CreateLocation from "../CreateLocation";

export const LocationHomePage = () => {
  const [locations, setLocations] = useState([]);
  const [locationFormOpen, setLocationFormOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState({ company: "", location: 0 });
  const [allLocations, setAllLocations] = useState([]);

  const updateLocation = (e) => {
    setLocation(e);
    setLocationFormOpen(true);
  };

  const handleCreate = async (newRow) => {
    console.log(locations);
    console.log(newRow);
    setLocations((prevLocations) => [...prevLocations, newRow]);
    setLocationFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    console.log(targetIndex);
    setLocations(locations.filter((_, idx) => idx !== targetIndex));
  };

  const handleSetLocationForm = async (e) => {
    e.preventDefault();
    setLocationFormOpen(true);
  };

  const closeForm = async (e) => {
    setLocation(null);
    setLocationFormOpen(false);
  };

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLocations(
      allLocations.filter((company) =>
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
  const handleReset = async (e) => {
    e.preventDefault();
    setSearch({ company: "", location: 0 });
    setLocations(allLocations);
  };

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
      <div className={styles.location_homepage_container}>
        <h1>Manage Locations</h1>
        <div className={styles.searchform}>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          >
            <label> Location Name</label>
            <input
              type="text"
              name="company"
              id="name"
              onChange={handleChange}
            ></input>
            <label> Country</label>
            <select name="country" id="country" onChange={handleChange}>
              <option value="CAN">Cannada</option>
              <option value="IND">India</option>
              <option value="JP">Japan</option>
              <option value="UAE">United Arab Emirited</option>
              <option value="US">United States</option>
            </select>
          </form>
        </div>
        <div className={styles.search_buttons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.location_table}>
          <button onClick={handleSetLocationForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Location
          </button>
          <Table
            rows={locations}
            updateCompany={updateLocation}
            deleteCompany={handleDelete}
          ></Table>
        </div>
        {locationFormOpen && (
          <CreateLocation
            updateCompany={location}
            onSubmit={handleCreate}
            closeForm={closeForm}
          ></CreateLocation>
        )}
      </div>
    </div>
  );
};

export default LocationHomePage;
