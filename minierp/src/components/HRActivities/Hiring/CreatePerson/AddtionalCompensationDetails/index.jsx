import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

export const AddtionalCompensationForm = ({ closeForm, onSubmit }) => {
  const [formState, setFormState] = useState({
    elementId: "",
    elementName: "",
    elementType: "",
    periodicity: "",
    startDate: "",
    value: 0.0,
    status: "ACTIVE",
  });

  const [elements, setElements] = useState([]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    console.log(formState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
    closeForm();
  };

  const handleChangeElement = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      elementName:
        e.target.options[e.target.selectedIndex].getAttribute("elementname"),
      elementType:
        e.target.options[e.target.selectedIndex].getAttribute("elementtype"),
      periodicity:
        e.target.options[e.target.selectedIndex].getAttribute("periodicity"),
    });
    console.log(formState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/getelements`);
        setElements(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.compensationAddForm}>
      <div className={styles.compensationAdd}>
        <form>
          <div>
            <label>Compensation </label>
            <select
              id="elementId"
              name="elementId"
              value={formState.elementId}
              required
              onChange={handleChangeElement}
            >
              <option value="0">Select Element</option>
              {elements.map((element) => (
                <option
                  key={element.elementid}
                  value={element.elementid}
                  id={element.elementid}
                  elementname={element.elementname}
                  elementtype={element.elementtype}
                  periodicity={element.periodicity}
                >
                  {element.elementname}
                </option>
              ))}
            </select>
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              placeholder="Eg: Google"
              id="startDate"
              value={formState.startDate}
              onChange={handleChange}
              required
            />
            <label>Value </label>
            <input
              type="number"
              name="value"
              placeholder="Eg: 200.00"
              id="value"
              value={formState.value}
              onChange={handleChange}
              required
            />

            <label>Status </label>
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
          </div>
          <div className={styles.buttons}>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <button onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
