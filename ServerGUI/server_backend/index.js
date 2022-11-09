const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

/*make button pass category argument back to backend*/

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

//what to do when user tries to reach specific page "/etc."
//res used to send response to frontend
//req used to get information from frontend
app.get('/server/getCategories', (req,res) =>{
    const getCategories = "SELECT DISTINCT \"Category\" FROM recipe";
    pool.query(getCategories, (err, result) => {
        res.send(result.rows);
    });
});

app.get('/server/getMenuItems', (req,res) => {
    const getItems = " SELECT * FROM recipe";
    pool.query(getItems, (err, result) => {
        res.send(result.rows);
    });
});

{/*app.get('/server/:category', (req,res) => {
    console.log(req.params.category);
});*/}

app.listen(3001, () => {
    console.log("running");
});

// Add process hook to shutdown pool
process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});