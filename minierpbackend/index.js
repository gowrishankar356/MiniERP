const client = require("./connection.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3300, () => {
  console.log("Sever is now listening at port 3300");
});

client.connect();

app.post("/person", (req, res) => {
  const title = req.body.title;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const gender = req.body.gender;

  const query =
    "Insert into person(title, firstname, lastname, gender,dateofbirth) values($1,$2,$3,$4,$5)";

  client.query(
    query,
    [title, firstName, lastName, gender, dob],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

// get persons
app.get("/getpersons", async (req, res) => {
  const persons =
    "SELECT personid, title, firstname, lastname, gender, dateofbirth FROM person;";
  client.query(persons, (err, result) => {
    if (err) return res.json(err);
    console.log(result);
    return res.json(result);
  });
});

//create Person
app.post("/createperson", (req, res) => {

  const hireDate = req.body.personalDetails.hireDate;
  const companyId = req.body.personalDetails.companyId;
  const employeeType = req.body.personalDetails.employeeType;
  const title = req.body.personalDetails.title;
  const firstName = req.body.personalDetails.firstName;
  const lastName = req.body.personalDetails.lastName;
  const gender = req.body.personalDetails.gender;
  const dob = req.body.personalDetails.dob;

  const citizenship = req.body.demographicDetails.citizenship;
  const citizenshipStatus = req.body.demographicDetails.citizenshipStatus;
  const maritalStatus = req.body.demographicDetails.maritalStatus;
  const email = req.body.demographicDetails.email;
  const countryCode = req.body.demographicDetails.countryCode;
  const phoneNumber = req.body.demographicDetails.phoneNumber;
  const addressLine1 = req.body.demographicDetails.addressLine1;
  const addressLine2 = req.body.demographicDetails.addressLine2;
  const city = req.body.demographicDetails.city;
  const state = req.body.demographicDetails.state;
  const country = req.body.demographicDetails.country;
  const postalCode = req.body.demographicDetails.postalCode;

  const jobId = req.body.employmentDetails.jobId;
  const gradeId = req.body.employmentDetails.gradeId;
  const departmentId = req.body.employmentDetails.departmentId;
  const locationId = req.body.employmentDetails.locationId;
  const managerId = req.body.employmentDetails.managerId;

  const compensations = req.body.compensations;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const personalDetailsQuery = "Insert into person values($1, $2, $3,$4, $5)";

  client.query(
    personalDetailsQuery,
    [title, firstName, lastName, gender, dob],
    (err, result) => {
      if (!err) {
        console.log("succsess")
        const personId = result.rows[0].personid;
        console.log("Person ID:", personId);
      } else {
        console.log(err);
      }
    }
  );

  // const demographicDetailsQuery =
  //   "Insert into Demographic values($1,$2,$3,$4,$5,$6)";

  // client.query(
  //   demographicDetailsQuery,
  //   [
  //     personId,
  //     citizenship,
  //     citizenshipStatus,
  //     maritalStatus,
  //     datecreated,
  //     createdby,
  //   ],
  //   (err, result) => {
  //     if (!err) {
  //       const demographicId = result.rows[0].demographicid;
  //       console.log("DemographicId ID:", demographicId);
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );

  // const contactDetailsQuery =
  //   "Insert into Contact values($1,$2,$3,$4,$5,$6, $7, $8, $9, $10, $11 )";

  // client.query(
  //   contactDetailsQuery,
  //   [
  //     personId,
  //     email,
  //     countryCode,
  //     phoneNumber,
  //     addressLine1,
  //     addressLine2,
  //     city,
  //     state,
  //     country,
  //     datecreated,
  //     createdby,
  //   ],
  //   (err, result) => {
  //     if (!err) {
  //       const contactId = result.rows[0].contactid;
  //       console.log("ContactId ID:", contactId);
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );

  // const assignmentDetailsQuery =
  //   "Insert into Assignment values($1,$2,$3,$4,$5,$6, $7, $8, $9, $10, $11. $12, $13 )";

  // client.query(
  //   assignmentDetailsQuery,
  //   [
  //     personId,
  //     hireDate,
  //     "",
  //     hireDate,
  //     companyId,
  //     departmentId,
  //     jobId,
  //     gradeId,
  //     locationId,
  //     employeeType,
  //     "",
  //     datecreated,
  //     createdby,
  //   ],
  //   (err, result) => {
  //     if (!err) {
  //       const assignmentId = result.rows[0].assignmentid;
  //       console.log("Assignment ID:", assignmentId);
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );

  // compensations.forEach((compensation) => {
  //   var elemententryQuery =
  //     "Insert into elemententry values($1,$2,$3,$4,$5,$6, $7 )";

  //   const parts = compensation.startDate.split("-");
  //   var year = parseInt(parts[0], 10);
  //   var month = parseInt(parts[1], 10) - 1;
  //   var day = parseInt(parts[2], 10);

  //   const startDateObject = new Date(year, month, day);
  //   var lastDayOfMonth = new Date(
  //     startDateObject.getFullYear(),
  //     startDateObject.getMonth() + 1,
  //     0
  //   );
  //   year = lastDayOfMonth.getFullYear();
  //   month = lastDayOfMonth.getMonth();
  //   day = lastDayOfMonth.getDate();
  //   var endDate = year + "-" + month + "-" + day;

  //   client.query(
  //     elemententryQuery,
  //     [
  //       assignmentId,
  //       compensation.elementId,
  //       compensation.value,
  //       compensation.startDate,
  //       compensation.periodicity === "R" ? "" : endDate,
  //       datecreated,
  //       createdby,
  //     ],
  //     (err, result) => {
  //       if (!err) {
  //         const elementEntryId = result.rows[0].elemententryid;
  //         console.log("ElementEntry ID:", elementEntryId);
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   );
  // });

  client.end;
});

// APIs for Location
app.post("/createlocation", (req, res) => {
  console.log(req.body);
  const locationname = req.body.locationName;
  const addressline1 = req.body.addressLine1;
  const addressline2 = req.body.addressLine2;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const postalcode = req.body.postalCode;
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const query =
    "Insert into location(locationname, addressline1, addressline2, city, state, country, postalcode, datecreated, createdby) values($1,$2,$3,$4,$5,$6,$7,$8,$9)";

  client.query(
    query,
    [
      locationname,
      addressline1,
      addressline2,
      city,
      state,
      country,
      postalcode,
      datecreated,
      createdby,
    ],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

// get locations
app.get("/getlocations", async (req, res) => {
  const locations =
    "SELECT locationId, locationName, addressline1, addressline2, city, state, country, postalcode, datecreated, createdby, lastupdateddate, updatedby FROM location;";
  client.query(locations, (err, result) => {
    if (err) return res.json(err);
    console.log(result);
    return res.json(result);
  });
});

// APIs for Company
app.post("/createcompany", (req, res) => {
  console.log(req.body);
  const companyName = req.body.companyName;
  const locationId = req.body.locationId;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const query =
    "Insert into company(companyName, locationId, datecreated, createdby) values($1,$2,$3,$4)";

  client.query(
    query,
    [companyName, locationId, datecreated, createdby],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

//get companies
app.get("/getcompanies", async (req, res) => {
  const companies =
    "select companyid, companyname, locationid, datecreated, createdby, lastupdateddate, updatedby from COMPANY;";
  client.query(companies, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// APIs for Grade
app.post("/creategrade", (req, res) => {
  const gradeName = req.body.gradeName;
  const minimumSalary = req.body.minimumSalary;
  const maximumSalary = req.body.maximumSalary;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const query =
    "Insert into grade(gradeName, minimumSalary,maximumSalary, datecreated, createdby) values($1,$2,$3,$4, $5)";

  client.query(
    query,
    [gradeName, minimumSalary, maximumSalary, datecreated, createdby],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

// get grade
app.get("/getgrades", async (req, res) => {
  const grades =
    "SELECT gradeid, gradename, minimumsalary, maximumsalary, datecreated, createdby, lastupdateddate, updatedby FROM grade;";
  client.query(grades, (err, result) => {
    if (err) return res.json(err);
    console.log(result);
    return res.json(result);
  });
});

//APIs of Job
app.post("/createjob", (req, res) => {
  const jobName = req.body.jobName;
  const companyId = req.body.companyId;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const query =
    "Insert into job(jobname, companyid, datecreated, createdby) values($1,$2,$3,$4)";

  client.query(
    query,
    [jobName, companyId, datecreated, createdby],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

// get jobs
app.get("/getjobs", async (req, res) => {
  const jobs =
    "SELECT jobid, jobname, companyid, datecreated, createdby, lastupdateddate, updatedby FROM job;";
  client.query(jobs, (err, result) => {
    if (err) return res.json(err);
    console.log(result);
    return res.json(result);
  });
});

//APIs of Department
app.post("/createdepartment", (req, res) => {
  const departmentName = req.body.departmentName;
  const companyId = req.body.companyId;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const query =
    "Insert into department(departmentname, companyid, datecreated, createdby) values($1,$2,$3,$4)";

  client.query(
    query,
    [departmentName, companyId, datecreated, createdby],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

// get departments
app.get("/getdepartments", async (req, res) => {
  const departments =
    "SELECT departmentid, departmentname, companyid, datecreated, createdby, lastupdateddate, updatedby FROM department;";
  client.query(departments, (err, result) => {
    if (err) return res.json(err);
    console.log(result);
    return res.json(result);
  });
});

//APIs of Element
app.post("/createelement", (req, res) => {
  const elementName = req.body.elementName;
  const elementType = req.body.elementType;
  const periodicity = req.body.periodicity;
  const companyId = req.body.companyId;

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const datecreated = `${day}-${month}-${year}`;
  const createdby = -1;

  const query =
    "Insert into element(elementname, elementtype, periodicity, companyId, datecreated, createdby) values($1,$2,$3,$4,$5, $6)";

  client.query(
    query,
    [elementName, elementType, periodicity, companyId, datecreated, createdby],
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    }
  );
  client.end;
});

// get elements
app.get("/getelements", async (req, res) => {
  const elements =
    "select elementid, elementname, elementtype, periodicity, companyid, datecreated, createdby, lastupdateddate, updatedby from element;";
  client.query(elements, (err, result) => {
    if (err) return res.json(err);
    console.log(result);
    return res.json(result);
  });
});
