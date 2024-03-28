import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteJob, updateJob }) => {
  const handleDelete = async (jobid) => {
    try {
      await axios.delete(`http://localhost:3300/deleteJob${jobid}`);
      deleteJob(jobid);
    } catch (error) {
      console.log(error);
      alert("Error deleting Job. Please try again.");
    }
  };
  return (
    <div className={styles.jobTableWrapper}>
      <table className={styles.jobTable}>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Company</th>
            <th>Location</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.jobname}</td>
                <td>{row.companyname}</td>
                <td>{row.locationname}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill
                      onClick={() => updateJob(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.jobid)}
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
