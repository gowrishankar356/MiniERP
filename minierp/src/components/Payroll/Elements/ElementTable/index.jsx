import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteElement, updateElement }) => {
  console.log(rows);
  const handleDelete = async (elementid) => {
    try {
      await axios.delete(`http://localhost:3300/deleteelement${elementid}`);
      deleteElement(Number(elementid));
    } catch (error) {
      console.log(error);
      alert("Error deleting element. Please try again.");
    }
  };
  return (
    <div className={styles.elementTableWrapper}>
      <table className={styles.elementTable}>
        <thead>
          <tr>
            <th>Element Name</th>
            <th>Element Type</th>
            <th>Periodicity</th>
            <th>Company</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.elementname}</td>
                <td>{row.elementtype}</td>
                <td>{row.periodicity}</td>
                <td>{row.companyname}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill
                      onClick={() => updateElement(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.elementid)}
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
