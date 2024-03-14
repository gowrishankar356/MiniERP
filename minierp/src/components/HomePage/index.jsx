import { React } from "react";
import styles from "./styles.module.css";
import NavBar from "../NavBar";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import StatCard from "../StatCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

ChartJS.defaults.font.size = 8;

const HomePage = () => {
  const options3 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const y = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const data3 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => y),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const data2 = {
    labels: ["Grades", "Locations", "Companies", "Departments", "Jobs"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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

  const option2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "WorkForce Structures",
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
      <div className={styles.StatCards}>
        <StatCard
          title={"Monthly Paid Salary"}
          uom={"$"}
          arrow={"decreasing"}
          measurement={50000}
          percentage={"10.88%"}
          src="images/down-arrow-red.svg"
          alt={"downarrow"}
          summary={"v/s previous month"}
        ></StatCard>
        <StatCard
          title={"Number of New Employees"}
          uom={""}
          measurement={14}
          percentage={"1%"}
          arrow={"increasing"}
          src="images/up-arrow-green.svg"
          alt={"downarrow"}
          summary={"v/s previous month"}
        ></StatCard>
        <StatCard
          title={"Yearly Paid Salary"}
          uom={"$"}
          measurement={"150,000"}
          percentage={"9%"}
          arrow={"decreasing"}
          src="images/down-arrow-red.svg"
          alt={"downarrow"}
          summary={"v/s previous year"}
        ></StatCard>
      </div>
      <div className={styles.lineGraph}>
        <Line options={options3} data={data3} />
      </div>
      <div className={styles.graphs}>
        <div className={styles.employeesGraph}>
          <Bar options={option} data={data} height={"150px"} width={"250px"} />
        </div>
        <div className={styles.workforceGraph}>
          <Doughnut
            data={data2}
            options={option2}
            height={"250px"}
            width={"350px"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
