# MiniERP - An Enterprise Resource Planning System

## Home Page:

<img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/DashBoard.png?raw=true" height="300" width="600">

### Menu

- Home consists of dashboard which summarizes statistics like number of employees grouped by category, monthly paid salaries etc.
- Workforce Structures menu is used to define and manage workforce structures for the company like grade, jobs, departments, etc.
- Core HR Activities menu is used to define and manage employees.

### Dashboard

- Consists statistic components which are defined using React.js and are reusable. They show the monthly paid salary and its comparision to previous months. Further more, they show number of newly hired employees and YTD paid salary to employees.
- Also, dashboard consists of graphs configured using react-chartJS. They visualize the salary paid to employees monthly wise,
  number of workforce structures, number of employees present grouped by category.

### Manage Employees

- Created a microservice to manage CRUD operations for Employee.
- Configured RESTful APIs to Create - POST method(/createemployee), Update - PUT method(/updateemployee),
  Read - GET method(/getemployees), and Delete - Delete method(/deleteemployee) using ExpressJS, NodeJS and PostgreSQL.
- Integrated those RESTful APIs to UI using ReatJS and succesfully created a user interface to communicate with microservice.
- Please refer below images to see how can you create an employee
<img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee6.png?raw=true" alt="image-description" height="300" width="600"/>
<details>
  <summary>Manage Employee</summary>
  <h4>Employee Home Page<h4>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee1.png?raw=true" alt="image-description" height="300" width="600"/>
  <h4>Hire an Employee</h4>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee2.png?raw=true" alt="image-description" height="300" width="600"/>
    <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee3.png?raw=true" alt="image-description" height="300" width="600"/>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee4.png?raw=true" alt="image-description" height="300" width="600"/>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee5.png?raw=true" alt="image-description" height="300" width="600"/>
    <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageemployee6.png?raw=true" alt="image-description" height="300" width="600"/>

</details>

### Workforce Structures

- Created different microservices for each worforce structure company, grade, department, job, location, and payroll elements.
- For each microservice created RESTful APIs to Create, Read, Update, and Delete which will communicate to respective PostgreSQL databases to execute respective CRUD Procedures.
- Please refer below images to see the homepages of workforce structures.

<details>
  <summary>Workfroce Structures</summary>
  <h4>Companies Home Page</h4>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/managecompany.png?raw=true" alt="image-description" height="300" width="600"/>
  <h4>Grades Home Page</h4>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/managegrade.png?raw=true" alt="image-description" height="300" width="600"/>
  <h4>Departments Home Page</h4>
    <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/managedepartment.png?raw=true" alt="image-description" height="300" width="600"/>
    <h4>Jobs Home Page</h4>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/managejob.png?raw=true" alt="image-description" height="300" width="600"/>
    <h4>Locations Home Page</h4>
  <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/managelocation.png?raw=true" alt="image-description" height="300" width="600"/>
    <h4>Elements Home Page</h4>
    <img src="https://github.com/gowrishankar356/MiniERP/blob/main/readme_pics/manageelement.png?raw=true" alt="image-description" height="300" width="600"/>
</details>
