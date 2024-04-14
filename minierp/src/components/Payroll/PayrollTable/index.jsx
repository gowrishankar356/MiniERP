import React from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteCompany, updateCompany }) => {
  console.log(rows);
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
            <th>Name</th>
            <th>Payroll Date</th>
            <th className={styles.expand}>Paid Amount</th>
            {/* <th className={styles.expand}>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const payrollDate = new Date(row.payrolldate);
            return (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>
                  {payrollDate.getFullYear() +
                    "-" +
                    payrollDate.getMonth() +
                    "-" +
                    payrollDate.getDay()}
                </td>
                <td>{row.paidamount}</td>
                {/* <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill
                      onClick={() => updateCompany(row)}
                    ></BsFillPencilFill>
                    <BsFillTrashFill
                      className={styles.delete_btn}
                      onClick={() => handleDelete(row.companyid)}
                    ></BsFillTrashFill>
                  </span>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
