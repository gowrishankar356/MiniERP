import React from "react";
import styles from "./styles.module.css";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteRow }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.expand}>Compensation</th>
            <th>Start Date</th>
            <th>Value</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText = row.status.charAt(0) + row.status.slice(1).toLowerCase();
            return (
              <tr key={idx}>
                <td>{row.compensation}</td>
                <td>{row.startdate}</td>
                <td>{row.value}</td>
                <td className={`${styles.lable} ${styles.lable_}${row.status}`}>{statusText}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={()=>deleteRow(idx)}
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
