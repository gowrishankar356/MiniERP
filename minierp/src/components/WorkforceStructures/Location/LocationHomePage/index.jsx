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
  const [search, setSearch] = useState({ locationname: "", country: "" });
  const [allLocations, setAllLocations] = useState([]);

  const updateLocation = (e) => {
    setLocation(e);
    setLocationFormOpen(true);
  };

  const handleUpdate = (updatedRow) => {
    console.log(updatedRow);
    const updateLocations = locations.map((location) =>
      location.locationid === updatedRow.locationid ? updatedRow : location
    );
    setLocations(updateLocations);
  };

  const handleCreate = async (newRow) => {
    setLocations((prevLocations) => [...prevLocations, newRow]);
    setLocationFormOpen(false);
  };

  const handleDelete = (targetIndex) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.locationid !== targetIndex)
    );
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
      allLocations.filter((location) =>
        search.locationname.length > 0
          ? search.country !== ""
            ? location.locationname
                .toLowerCase()
                .includes(search.locationname.toLowerCase()) &&
              location.country === search.country
            : location.locationname
                .toLowerCase()
                .includes(search.locationname.toLowerCase())
          : search.country !== ""
          ? location.country === search.country
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
        setAllLocations(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <NavBar></NavBar>
      <div className={styles.locationHomePageContainer}>
        <h1>Manage Locations</h1>
        <div className={styles.locationSearchForm}>
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
              name="locationname"
              id="locationname"
              onChange={handleChange}
            ></input>
            <label> Country</label>
            <select name="country" id="country" onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="Cannada">Cannada</option>
              <option value="India">India</option>
              <option value="Japan">Japan</option>
              <option value="United Arab Emirited">United Arab Emirited</option>
              <option value="United States">United States</option>
            </select>
          </form>
        </div>
        <div className={styles.locationSearchButtons}>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className={styles.locationTable}>
          <button onClick={handleSetLocationForm}>
            <h3>
              <b>+</b>
            </h3>{" "}
            Create Location
          </button>
          <Table
            rows={locations}
            updateLocation={updateLocation}
            deleteLocation={handleDelete}
          ></Table>
        </div>
        {locationFormOpen && (
          <div className={styles.locationFormComp}>
            <CreateLocation
              updateLocation={location}
              onSubmit={handleCreate}
              onUpdate={handleUpdate}
              closeForm={closeForm}
            ></CreateLocation>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationHomePage;
