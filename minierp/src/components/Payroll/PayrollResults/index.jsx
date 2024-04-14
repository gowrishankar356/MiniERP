import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../NavBar";
import Table from "../PayrollTable";
import styles from "./styles.module.css";

const PayrollResults = () => {
  const [companies, setCompanies] = useState([]);
  const [payroll, setParoll] = useState({ company: 0, month: 0, year: 0 });
  const [payrollResults, setPayrollResults] = useState([]);

  const months = [
    { month_no: 1, month_name: "January" },
    { month_no: 2, month_name: "February" },
    { month_no: 3, month_name: "March" },
    { month_no: 4, month_name: "April" },
    { month_no: 5, month_name: "May" },
    { month_no: 6, month_name: "June" },
    { month_no: 7, month_name: "July" },
    { month_no: 8, month_name: "August" },
    { month_no: 9, month_name: "September" },
    { month_no: 10, month_name: "October" },
    { month_no: 11, month_name: "November" },
    { month_no: 12, month_name: "December" },
  ];

  const handleChange = (e) => {
    setParoll((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/getallcompanies`
        );
        setCompanies(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/getPayrollResults`
        );
        setPayrollResults(response.data.rows);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.payrollContainer}>
      <NavBar></NavBar>
      <div className={styles.payrollHomePageontainer}>
        <h1>Run Payroll</h1>
        <div className={styles.payrollSearchForm}>
          <form>
            <label> Company</label>
            <select name="company" id="company" onChange={handleChange}>
              <option value={0}>Select Company</option>
              {companies.map((company) => (
                <option value={Number(company.companyid)}>
                  {company.locationname}
                </option>
              ))}
            </select>
            <label> Pryoll Month</label>
            <select name="month" id="month" onChange={handleChange}>
              <option value={0}>Select Month</option>
              {months.map((month) => (
                <option value={Number(month.month_no)}>
                  {month.month_name}
                </option>
              ))}
            </select>
            <label> Payroll Year</label>
            <select name="year" id="year" onChange={handleChange}>
              <option value={0}>Select Month</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
              <option value={2029}>2029</option>
              <option value={2030}>2030</option>
            </select>
          </form>
          <button>Submit Payroll</button>
        </div>
        <div className={styles.payrollResultsTable}>
          <Table rows={payrollResults}></Table>
        </div>
      </div>
    </div>
  );
};

export default PayrollResults;
