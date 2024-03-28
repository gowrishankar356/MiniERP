import React, { useState } from "react";
import axios from "axios";

import styles from "./styles.module.css";

const CreateLocation = ({ updateLocation, closeForm, onSubmit, onUpdate }) => {
  const [location, setLocation] = useState({
    locationid: updateLocation ? updateLocation?.locationid : 0,
    locationname: updateLocation ? updateLocation?.locationname : "",
    addressline1: updateLocation ? updateLocation.addressline1 : "",
    addressline2: updateLocation ? updateLocation.addressline2 : "",
    city: updateLocation ? updateLocation.city : "",
    state: updateLocation ? updateLocation.state : "",
    country: updateLocation ? updateLocation.country : "",
    postalcode: updateLocation ? updateLocation.postalcode : "",
    datecreated: updateLocation ? updateLocation?.datecreated : Date(),
    createdby: updateLocation ? updateLocation?.createdby : 0,
    lastupdateddate: updateLocation ? updateLocation?.lastupdateddate : Date(),
    updatedby: updateLocation ? updateLocation?.updatedby : 0,
  });

  const handleChange = (e) => {
    setLocation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error cancelling current transaction!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(location);
    try {
      const res = await axios.post(
        `http://localhost:3300/createlocation`,
        location
      );
      console.log(res.data[0]?.locationid);
      setLocation((prev) => ({
        ...prev,
        locationid: res.data[0]?.locationid,
      }));
      onSubmit({
        ...location,
        locationid: res.data[0]?.locationid,
      });
    } catch (error) {
      console.log(error);
      alert("Error adding location. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3300/updateLocation`, location);
      onUpdate(location);
      closeForm();
    } catch (error) {
      console.log(error);
      alert("Error updating Location. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.locationForm}>
        <h2>Create Location</h2>
        <form>
          <div>
            <label>
              Location<br></br>
              <input
                type="text"
                name="locationname"
                id="locationname"
                value={location.locationname}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Address Line 1<br></br>
              <input
                type="text"
                name="addressline1"
                id="addressline1"
                value={location.addressline1}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Address Line 2<br></br>
              <input
                type="text"
                name="addressline2"
                id="addressline2"
                value={location.addressline2}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              City<br></br>
              <input
                type="text"
                name="city"
                id="city"
                value={location.city}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              State<br></br>
              <input
                type="text"
                name="state"
                id="state"
                value={location.state}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Country<br></br>
              <input
                type="text"
                name="country"
                id="country"
                value={location.country}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Postal Code<br></br>
              <input
                type="text"
                name="postalcode"
                id="postalcode"
                value={location.postalcode}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div className={styles.buttons}>
          {updateLocation ? (
            <button type="submit" onClick={handleUpdate}>
              Update Location
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Create Location
            </button>
          )}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateLocation;
