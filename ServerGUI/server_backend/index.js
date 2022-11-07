const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();
const port = 3001;
//const cors = require('cors');

//app.use(cors());
//app.use(express.json());
//app.use(bodyParser.urlencoded({extended:true}));
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
app.get('/', (req,res) => {
    //res used to send response to frontend
    res.send("hello wd");
    //req used to get information from frontend
});

app.get('/server/getCategories', (req,res) =>{
    res.send("getting categories");
    const sqlGetCategories = "SELECT \"Category\" FROM recipe";
    pool.query(sqlGetCategories, (err, result) => {
        console.log(result);
    })
});

app.listen(3001, () => {
    console.log("running");
});

// Add process hook to shutdown pool
/*process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});*/