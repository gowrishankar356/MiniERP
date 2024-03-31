import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteJob, updateJob }) => {
  console.log(rows);
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
            <th>{"       "}</th>
            <th>Person ID</th>
            <th>Name</th>
            <th>Job</th>
            <th>Department</th>
            <th>Location</th>
            <th>Email</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr key={row.personid}>
                <td>
                  <img
                    src={"images/" + row.personid.toString() + ".jpeg"}
                    alt={row.personid.toString() + "Pic"}
                  ></img>
                </td>
                <td>{row.personid}</td>
                <td>{row.fullname}</td>
                <td>{row.jobname}</td>
                <td>{row.departmentname}</td>
                <td>{row.locationname}</td>
                <td>{row.email}</td>
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
