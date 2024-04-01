import React from "react";
import styles from "./styles.module.css";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export const Table = ({ rows, deleteRow }) => {
  return (
    <div className={styles.compensationTableWrapper}>
      <table className={styles.compensationTable}>
        <thead>
          <tr>
            <th>Compensation</th>
            <th>Value</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Periodicity</th>
            <th className={styles.expand}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const parts = row.startDate.split("-");
            var year = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10) - 1;
            var day = parseInt(parts[2], 10);

            const startDateObject = new Date(year, month, day);
            var lastDayOfMonth = new Date(
              startDateObject.getFullYear(),
              startDateObject.getMonth() + 1,
              0
            );
            year = lastDayOfMonth.getFullYear();
            month = lastDayOfMonth.getMonth();
            day = lastDayOfMonth.getDate();
            var endDate = year + "-" + month + "-" + day;

            return (
              <tr key={idx}>
                <td>{row.elementName}</td>
                <td>{row.value}</td>
                <td>{row.startDate}</td>
                <td>{row.periodicity === "R" ? "" : endDate}</td>
                <td>{row.periodicity}</td>
                <td>
                  <span className={styles.actions}>
                    <BsFillPencilFill></BsFillPencilFill>
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
