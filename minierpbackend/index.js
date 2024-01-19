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
    console.log('came here')
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

