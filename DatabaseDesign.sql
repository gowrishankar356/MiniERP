--DB code for Person Table
create table Person(
	personId int generated by default as identity,
	title varchar(10) not null,
	firstName varchar(120) not null,
	lastName varchar(120) not null,
	gender varchar(20) not null,
	dateofbirth date not null,
	datecreated date not null,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(personid)	
)


--DB code for Demographic Table
create table Demographic (
	demographicid int generated by default as identity,
	personid int not null unique,
	citizenship varchar(40) not null,
	status varchar(10) not null,
	maritalstatus varchar(10) not null,
	datecreated date,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(demographicid,personid),
	constraint fk_demographic_person_personid foreign key(personid) references person(personid)
);

--DB code for Contact table
create table Contact (
	contactId int generated by default as identity,
	personid int not null unique,
	email varchar(120) not null,
	countrycode varchar(120) not null,
	mobileno bigint not null,
	addressline1 varchar(120) not null,
	addressline2 varchar(120),
	city varchar(120) not null,
	state varchar(120) not null,
	country varchar(120) not null,
	postalcode varchar(120) not null,
	datecreated date,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(contactId,personid),
	constraint fk_contact_person_personid foreign key(personid) references person(personid)
);


--DB code for Assignment Information table
create table Assignment (
	assignmentId int generated by default as identity,
	personid int not null unique,
	assignmentstartdate date not null,
	assignmentenddate date not null,
	hiredate date not null,
	companyid int not null,
	departmentid int not null,
	jobid int not null,
	gradeid int not null,
	locationid int not null,
	employeetype varchar(20) not null,
	managerid int not null,
	datecreated date not null,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(assignmentId),
	constraint fk_assignment_person_personid foreign key(personid) references person(personid),
	constraint fk_assignment_company_companyid foreign key(companyid) references company(companyid),
	constraint fk_assignment_department_departmentid foreign key(departmentid) references department(departmentid),
	constraint fk_assignment_job_jobid foreign key(jobid) references job(jobid),
	constraint fk_assignment_grade_gradeid foreign key(gradeid) references grade(gradeid),
	constraint fk_assignment_location_locationid foreign key(locationid) references location(locationid),
	constraint dk_assignment_person_managerid foreign key(managerid) references person(personid)	
);


--DB code for Payroll info table
create table payroll (
	payrollid int generated by default as identity,
	personid int not null unique,
	assignmentid int not null,
	datecreated date not null,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(payrollid,personid),
	constraint fk_payroll_person_personid foreign key(personid) references person(personid),
	constraint fk_payroll_assignment_id foreign key(assignmentid) references assignment(assignmentid)
);

--DB code for Element Entry
create table elemententry (
	elemententryid int generated by default as identity,
	assignmentid int not null,
	elementid int not null,
	elemententryvalue int not null,
	elemententrystartdate date not null,
	elemententryenddate date not null,
	datecreated date,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(assignmentid,elementid),
	constraint fk_elemententry_assignment_assignmentid foreign key(assignmentid) references Assignment(assignmentid),
	constraint fk_elemententry_element_elementid foreign key(elementid) references element(elementid)
);

--DB code for Company
create table company (
	companyid int generated by default as identity,
	companyname varchar(240) not null,
	locationid int not null,
	datecreated date not null,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(companyid),
	constraint fk_company_location_location_id foreign key(locationid) references location(locationid)
);

--DB Code for Grade
create table grade (
	gradeid int generated by default as identity,
	gradename varchar(60) not null unique,
	minimumsalary int not null,
	maximumsalary int not null,
	datecreated date,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(gradeid)
);

--DB code for Job
create table job (
	jobid int generated by default as identity,
	jobname varchar(120) not null,
	companyid int not null,
	locationid int not null,
	datecreated date not null,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(jobid),
	constraint fk_job_company_companyid foreign key(companyid) references company(companyid),	
	constraint fk_job_location_locationid foreign key(locationid) references location(locationid)	
);

--DB code for Department
create table Department (
	departmentid int generated by default as identity,
	departmentname varchar(240) not null,
	companyid int not null,
	datecreated date not null,
	createdby int not null,
	lastupdateddate date,
	updatedby int,
	primary key(departmentid),
	constraint fk_department_company_companyid foreign key(companyid) references company(companyid)	
);

--DB code for location
create table location (
	locationid int generated by default as identity,
	locationname varchar(240) not null unique,
	addressline1 varchar(120) not null,
	addressline2 varchar(120),
	city varchar(120) not null,
	state varchar(120) not null,
	country varchar(120) not null,
	postalcode varchar(120) not null,	
	datecreated date not null,
	createdby int not null,
	lastupdateddate date null,
	updatedby int null,
	primary key(locationid)
);



--DB code for element
create table element (
	elementid int generated by default as identity,
	elementname varchar(240) not null unique,
	elementtype varchar(120) not null,
	periodicity varchar(120) not null,
	companyId int not null,
	datecreated date,
	createdby int not null,
	lastupdateddate date null,
	updatedby int null,
	primary key(elementid)
);

--Procedures
--Location procedures
CREATE or REPLACE function GetAllLocations() 
RETURNS TABLE(locationid INT,
    locationname VARCHAR,
	addressline1 varchar,
	addressline2 varchar,
	city varchar,
	state varchar,
	country varchar,
	postalcode varchar,
    datecreated DATE,
    createdby INT,
    lastupdateddate DATE,
    updatedby INT)
AS $$
BEGIN
RETURN QUERY
select l.locationid, l.locationname, l.addressline1, l.addressline2, l.city, l.state,
l.country,  l.datecreated,  l.createdby, l.lastupdateddate, l.updatedby
from location l;
END;
$$ Language plpgsql;

-- Update Location Function
CREATE or Replace function UpdateLocation(p_locationId integer, p_locationName varchar, p_addressline1 varchar,
										  p_addressline2 varchar, p_city varchar, p_state varchar, p_country varchar,
										  p_postalcode varchar, p_dateCreated date, p_createdBy integer, 
										  p_lastUpdatedDate date, p_updatedBy integer)
RETURNS VOID
AS $$
Update Location
set locationname = p_locationName,
addressline1 = p_addressline1,
addressline2 = p_addressline2,
city = p_city,
state = p_state,
country = p_country,
postalcode = p_postalcode,
datecreated = p_dateCreated,
createdby = p_createdBy,
lastupdateddate = p_lastUpdatedDate,
updatedby = p_updatedBy
where locationid = p_locationId
$$ Language SQL;


--Company Procedures
--Get All Companies
CREATE or REPLACE function GetAllCompanies() 
RETURNS TABLE(companyid INT,
    companyname VARCHAR,
	locationid INT,
	locationname varchar,
    datecreated DATE,
    createdby INT,
    lastupdateddate DATE,
    updatedby INT)
AS $$
BEGIN
RETURN QUERY
select c.companyid, c.companyname, c.locationid,l.locationname, c.datecreated,  c.createdby, c.lastupdateddate, c.updatedby
from company c, location l
where c.locationid = l.locationid;
END;
$$ Language plpgsql;

--Update Company
CREATE or Replace function UpdateCompany(p_companyId integer, 
										 p_companyName varchar, 
										 p_locationId integer, 
										 p_dateCreated date, 
										 p_createdBy integer, 
										 p_lastUpdatedDate date, 
										 p_updatedBy integer)
RETURNS VOID
AS $$
Update Company
set companyname = p_companyName,
locationid = p_locationId,
datecreated = p_dateCreated,
createdby = p_createdBy,
lastupdateddate = p_lastUpdatedDate,
updatedby = p_updatedBy
where companyid = p_companyId
$$ Language SQL;


--Update Grade
CREATE or Replace function UpdateGrade(p_gradeId integer, p_gradeName varchar, p_minimumSalary integer, p_maximumSalary integer, p_dateCreated date, p_createdBy integer, p_lastUpdatedDate date, p_updatedBy integer)
RETURNS VOID
AS $$
Update Grade
set gradename = p_gradeName,
minimumsalary = p_minimumSalary,
maximumsalary = p_maximumSalary,
datecreated = p_dateCreated,
createdby = p_createdBy,
lastupdateddate = p_lastUpdatedDate,
updatedby = p_updatedBy
where gradeid = p_gradeId
$$ Language SQL;

-- Get All Departments
CREATE or REPLACE Function GetAllDepartments() 
RETURNS TABLE(departmentid INT,
    departmentname VARCHAR,
	companyid INT,
    companyname VARCHAR,
    datecreated DATE,
    createdby INT,
    lastupdateddate DATE,
    updatedby INT)
AS $$
BEGIN
RETURN QUERY
select d.departmentid, d.departmentname,c.companyid, c.companyname, d.datecreated, d.createdby, d.lastupdateddate, d.updatedby
from department d, company c
where d.companyid = c.companyid;
END;
$$ Language plpgsql;


--Update Department
CREATE or Replace function UpdateDepartment(p_departmentId integer, p_departmentName varchar, p_companyId integer, p_dateCreated date, p_createdBy integer, p_lastUpdatedDate date, p_updatedBy integer)
RETURNS VOID
AS $$
Update Department
set departmentname = p_departmentName,
companyid = p_companyId,
datecreated = p_dateCreated,
createdby = p_createdBy,
lastupdateddate = p_lastUpdatedDate,
updatedby = p_updatedBy
where departmentid = p_departmentId
$$ Language SQL;


--Get All Jobs:
CREATE or REPLACE Function GetAllJobs() 
RETURNS TABLE(jobid INT,
    jobname VARCHAR,
	companyid INT,
    companyname VARCHAR,
	locationid INT,
	locationname VARCHAR,
    datecreated DATE,
    createdby INT,
    lastupdateddate DATE,
    updatedby INT)
AS $$
BEGIN
RETURN QUERY
select j.jobid, j.jobname, c.companyid, c.companyname, l.locationid, l.locationname, j.datecreated, j.createdby, j.lastupdateddate, j.updatedby
from job j, company c, location l
where j.companyid = c.companyid
and l.locationid = j.locationid;
END;
$$ Language plpgsql;

--Update Job
CREATE or Replace function UpdateJob(p_jobId integer, p_jobName varchar, p_companyId integer, p_locationId integer, p_dateCreated date, p_createdBy integer, p_lastUpdatedDate date, p_updatedBy integer)
RETURNS VOID
AS $$
Update Job
set jobname = p_jobName,
companyId = p_companyId,
locationId = p_locationId,
datecreated = p_dateCreated,
createdby = p_createdBy,
lastupdateddate = p_lastUpdatedDate,
updatedby = p_updatedBy
where jobid = p_jobId
$$ Language SQL;

-- Get All Elements
CREATE or REPLACE Function GetAllElements() 
RETURNS TABLE(elementid INT,
    elementname VARCHAR,
	elementtype VARCHAR,
    periodicity VARCHAR,
	companyid INT,
	companyname VARCHAR,
    datecreated DATE,
    createdby INT,
    lastupdateddate DATE,
    updatedby INT)
AS $$
BEGIN
RETURN QUERY
select e.elementid, e.elementname, e.elementtype, e.periodicity, c.companyid, c.companyname, e.datecreated, e.createdby, e.lastupdateddate, e.updatedby
from element e, company c
where e.companyid = c.companyid;
END;
$$ Language plpgsql;

--Update Element
CREATE or Replace function UpdateElement(p_elementId integer, p_elementName varchar,p_elementType varchar, p_periodicity varchar, p_companyId integer, p_dateCreated date, p_createdBy integer, p_lastUpdatedDate date, p_updatedBy integer)
RETURNS VOID
AS $$
Update element
set elementname = p_elementName,
elementtype = p_elementType,
periodicity = p_periodicity,
companyId = p_companyId,
datecreated = p_dateCreated,
createdby = p_createdBy,
lastupdateddate = p_lastUpdatedDate,
updatedby = p_updatedBy
where elementid = p_elementId
$$ Language SQL;



-- Get All employees
CREATE or REPLACE Function GetAllEmployeesHRDetails() 
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
and a.assignmentstartdate <= '2024-03-31'
and a.assignmentenddate >= '2024-03-31'
and a.companyid = com.companyid
and a.departmentid = dep.departmentid
and a.jobid = j.jobid
and g.gradeid = a.gradeid
and a.locationid = l.locationid
and p.personid = man.personid;
END;
$$ Language plpgsql;
	
	
	

	
	

	


	





















