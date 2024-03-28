import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteDepartment, updateDepartment }) => {
  const handleDelete = async (departmentid) => {
    try {
      await axios.delete(
        `http://localhost:3300/deleteDepartment${departmentid}`
      );
      deleteDepartment(Number(departmentid));
    } catch (error) {
      console.log(error);
      alert("Error deleting Department. Please try again.");
    }
  };
  return (
    <div className={styles.departmentTableWrapper}>
      <table className={styles.departmentTable}>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Company Name</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.departmentname}</td>
                <td>{row.companyname}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill
                      onClick={() => updateDepartment(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.departmentid)}
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
