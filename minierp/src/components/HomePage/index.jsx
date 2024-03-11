import { React } from "react";
import styles from "./styles.module.css";
import NavBar from "../NavBar";

import { Bar, Pie } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const HomePage = () => {
  const data2 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const option = {
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Enployee v/s Job Type",
      },
    },
  };
  const data = {
    labels: ["Full-Time", "Part-Time", "Contract"],
    datasets: [
      {
        label: "Employees",
        data: [20, 10, 40],
        backgroundColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        width: 1,
      },
    ],
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className={styles.graphs}>
        <div className={styles.employeesGraph}>
          <Bar options={option} data={data} />
        </div>
        <div className={styles.workforceGraph}>
          <Pie data={data2} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
