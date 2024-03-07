import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteLocation, updateLocation }) => {
  const handleDelete = async (locationid) => {
    try {
      await axios.delete(`http://localhost:3300/deleteLocation${locationid}`);
      deleteLocation(Number(locationid));
    } catch (error) {
      console.log(error);
      alert("Error deleting Location. Please try again.");
    }
  };
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Grade Name</th>
            <th>Minimum Salary</th>
            <th>Maximum Salary</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.gradename}</td>
                <td>{row.minimumsalary}</td>
                <td>{row.maximumsalary}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill
                      onClick={() => updateLocation(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.locationid)}
                    ></BsFillTrashFill>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
