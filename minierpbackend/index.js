const client = require('./connection.js')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(bodyParser.json());


app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/person', (req, res)=>{
    client.query(`Select * from person`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/person', (req, res)=>{
    const title = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const gender = req.body.gender;

    const query = 'Insert into person(title, firstname, lastname, gender,dateofbirth) values($1,$2,$3,$4,$5)'


    client.query(query,[title,firstName,lastName,gender, dob], (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err);
        }
    });
    client.end;
})

// APIs for Location
app.post('/createlocation', (req, res)=>{
    console.log(req.body)
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

    const query = 'Insert into location(locationname, addressline1, addressline2, city, state, country, postalcode, datecreated, createdby) values($1,$2,$3,$4,$5,$6,$7,$8,$9)'

    client.query(query,[locationname,addressline1,addressline2,city,state, country,postalcode, datecreated,  createdby], (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err);
        }
    });
    client.end();
})

// get locations
app.get("/getlocations", async (req,res)=>{  
    const locations = "SELECT locationId, locationName, addressline1, addressline2, city, state, country, postalcode, datecreated, createdby, lastupdateddate, updatedby FROM location;"
    client.query(locations,(err,result)=>{
        if (err) return res.json(err)
        console.log(result)
        return res.json(result);
    })
})

// APIs for Company
app.post('/createcompany', (req, res)=>{
    console.log(req.body)
    const companyName = req.body.companyName;
    const locationId  = req.body.locationId;

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const datecreated = `${day}-${month}-${year}`;
    const createdby = -1;

    const query = 'Insert into company(companyName, locationId, datecreated, createdby) values($1,$2,$3,$4)'

    client.query(query,[companyName,locationId,datecreated,createdby], (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err);
        }
    });
    client.end();
})
