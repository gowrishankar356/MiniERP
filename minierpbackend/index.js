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

app.get("/person", (req, res) => {
  client.query(`Select * from person`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

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
  const companies = "select companyid, companyname, locationid, datecreated, createdby, lastupdateddate, updatedby from COMPANY;";
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
