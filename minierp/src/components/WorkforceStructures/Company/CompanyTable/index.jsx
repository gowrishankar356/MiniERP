import React from "react";
import styles from "./styles.module.css";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteRow, updateCompany }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
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
                      onClick={() => deleteRow(idx)}
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
