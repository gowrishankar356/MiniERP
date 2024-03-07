import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteGrade, updateGrade }) => {
  const handleDelete = async (gradeid) => {
    try {
      await axios.delete(`http://localhost:3300/deletegrade${gradeid}`);
      deleteGrade(Number(gradeid));
    } catch (error) {
      console.log(error);
      alert("Error deleting Grade. Please try again.");
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
                      onClick={() => updateGrade(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.gradeid)}
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
