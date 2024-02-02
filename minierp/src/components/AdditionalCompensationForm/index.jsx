import React, { useState } from "react";
import styles from "./styles.module.css";

export const AddtionalCompensationForm = ({ closeForm, onSubmit }) => {
  const [formState, setFormState] = useState({
    compensation: "",
    startdate: "",
    value: 0.0,
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    onSubmit(formState);
    closeForm();
  }

 

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <form>
          <div>
            <label>
              Compensation<br></br>
              <input
                type="text"
                name="compensation"
                placeholder="Eg: Housing Allowance"
                id="compensation"
                value={formState.compensation}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Start Date<br></br>
              <input
                type="date"
                name="startdate"
                placeholder="Eg: Google"
                id="startdate"
                value={formState.startDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Value<br></br>
              <input
                type="number"
                name="value"
                placeholder="Eg: 200.00"
                id="value"
                value={formState.value}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Status<br></br>
              <select
                id="status"
                onChange={handleChange}
                name="status"
                value={formState.status}
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </label>
          </div>
          <div class="flex flex-column">
            <button type="submit" className={styles.btn} onClick={handleSubmit}>
              Submit
            </button>
            <button className={styles.btn} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
