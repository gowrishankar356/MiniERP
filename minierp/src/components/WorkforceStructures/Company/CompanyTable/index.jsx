import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteCompany, updateCompany }) => {
  const handleDelete = async (companyid) => {
    try {
      console.log(companyid);
      await axios.delete(`http://localhost:3300/deleteCompany${companyid}`);
      deleteCompany(companyid);
    } catch (error) {
      console.log(error);
      alert("Error deleting Company. Please try again.");
    }
  };
  return (
    <div className={styles.companyTableWrapper}>
      <table className={styles.companyTable}>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Location</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.companyname}</td>
                <td>{row.locationname}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill
                      onClick={() => updateCompany(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.companyid)}
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
