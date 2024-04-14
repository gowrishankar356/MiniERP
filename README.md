# MiniERP - An Enterprise Resource Planning System

## Project Overview:

The MiniERP client-server application is an enterprise resource planning system designed to streamline the management of employee data, including personal details, employment history, leave records, and payroll information. The primary goal of the system is to ensure accurate and efficient management of employee-related data while facilitating seamless communication between different departments within the organization.

## Key Features:

##### 1. Comprehensive Employee Management:

The application provides a centralized platform for storing and managing all employee-related information, such as personal details (name, contact information, etc.) and employment history (position, department, etc.). This ensures that all relevant data is easily accessible and up-to-date.

##### 2. Leave Management:

The system includes functionality for tracking employee leave requests, approvals, and balances. Managers can efficiently manage leave requests, and employees can easily view their remaining leave balances and request time off as needed.

##### 3. Accurate Payroll Calculation:

One of the critical features of the MiniERP system is its ability to calculate monthly payroll with 100% accuracy. By integrating with relevant data sources and applying predefined payroll rules, the system automates the payroll process, reducing the risk of errors and ensuring timely and accurate payments to employees.

##### 4. Data Visualization:

To provide insights into payroll trends and employee-related metrics, the application includes a dashboard module. This dashboard utilizes React-Table and React-ChartJS libraries to visualize data on salaries paid, number of employees, and other key performance indicators. This visualization enables stakeholders to track important metrics at a glance and make data-driven decisions.

## Technologies Used:

##### Client-Side:

The front-end of the application is built using React.js, a popular JavaScript library for building user interfaces. React-Table and React-ChartJS libraries are used for displaying tabular and graphical data, respectively, providing a responsive and interactive user experience.

##### Server-Side:

The back-end of the application is implemented using a server-side technology stack Node.js to handle data storage, retrieval, and business logic. The server-side architecture ensures data security, scalability, and performance.

##### Database:

Employee data is stored in a secure and reliable database system PostgreSQL to ensure data integrity and accessibility.

## Database:

- Designed and Configured a database using PostgreSQL which consists of 20+ tables.
- Created indexes to optimize the querying time and procedures for CRUD operations for each table.
- Used those procedures to implement RESTful APIs using ExpressJS and NodeJS.
- Below is one of the example procedure configured to retrieve employee details.

```
CREATE or REPLACE Function GetAllEmployeesHRDetails(p_date date)
RETURNS TABLE(personid INT,
    fullname text,
	gender VARCHAR,
	dateofbirth date,
	demographicid int,
	citizenship varchar,
	citizenshipstatus varchar,
	maritalstatus varchar,
	contactid int,
	email varchar,
	mobileno bigint,
	addressline1 varchar,
	addressline2 varchar,
	city varchar,
	state varchar,
	country varchar,
	postalcode varchar,
	assignmentid int,
	assignmentstartdate date,
	assignmentenddate date,
	hiredate date,
	companyid int,
	companyname varchar,
	departmentid int,
	departmentname varchar,
	jobid int,
	jobname varchar,
	gradeid int,
	gradename varchar,
	locationid int,
	locationname varchar,
	employeetype varchar,
	managerid int,
	managername varchar
    )
AS $$
BEGIN
RETURN QUERY
select p.personid, p.title || ' ' || p.firstname || ' '|| p.lastname as fullname, p.gender, p.dateofbirth,
d.demographicid, d.citizenship, d.status, d.maritalstatus,
c.contactid, c.email, c.mobileno, c.addressline1, c.addressline2, c.city, c.state, c.country, c.postalcode,
a.assignmentid, a.assignmentstartdate, a.assignmentenddate, a.hiredate, a.companyid, com.companyname,
a.departmentid, dep.departmentname, a.jobid, j.jobname, a.gradeid, g.gradename, a.locationid, l.locationname, a.employeetype, a.managerid, man.firstname
from person p, demographic d, contact c, assignment a, company com, Department dep,job j, grade g, location l, person man
where p.personid = d.personid
and d.personid = c.personid
and a.personid = p.personid
and a.assignmentstartdate <= p_date
and a.assignmentenddate >= p_date
and a.companyid = com.companyid
and a.departmentid = dep.departmentid
and a.jobid = j.jobid
and g.gradeid = a.gradeid
and a.locationid = l.locationid
and p.personid = man.personid;
END;
$$ Language plpgsql;

```

Below procedure and views are used to implement monthly payroll.

```
CREATE OR REPLACE VIEW PayrollDetails as
select p.personid, p.firstname || ' ' || p.lastname as name, a.assignmentstartdate, a.assignmentenddate, ee.elemententryvalue,
ee.elemententrystartdate,  ee.elemententryenddate, e.periodicity
from person p, assignment a, elemententry ee, element e
where p.personid = a.personid
and a.assignmentid = ee.assignmentid
and ee.elementid = e.elementid


drop view PayrollDetails

--Run Payroll Function
CREATE or REPLACE Function RunPayroll(p_PayrollStartDate Date,p_PayrollEndDate Date,  p_CurDate Date)
RETURNS VOID
AS $$
DECLARE
persons text;
payrollQuery text;
i int;
j PayrollDetail;
payrollStartDate date;
payrollEndDate date;
monthPaidAmount BigInt;
BEGIN
persons := 'Select personid from person;';
for i in execute persons
	Loop
	payrollQuery := 'Select q.personid, q.name, q.assignmentstartdate ,q.assignmentenddate,q.elemententryvalue , q.elemententrystartdate,
					 q.elemententryenddate, q.periodicity from PayrollDetails q where q.personid = ' || i;
	monthPaidAmount := 0;
	for j in execute payrollQuery
		Loop
		payrollStartDate := greatest(p_PayrollStartDate, j.assignmentstartdate, j.elemententrystartdate);
		payrollEndDate := least(p_PayrollEndDate, j.assignmentenddate, j.elemententryenddate);
		monthPaidAmount := monthPaidAmount +
							((j.elemententryvalue)*(payrollEndDate-payrollStartDate+1))/(p_PayrollEndDate - p_PayrollStartDate + 1);
	end loop;
	Insert into payrollResults(personid, payrolldate, paidamount, datecreated,createdby)
	values(i,p_PayrollEndDate,monthPaidAmount, p_CurDate,1 );
end loop;
END;
$$ Language plpgsql;

```

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
