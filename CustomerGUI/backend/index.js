const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
// Create express app
const app = express();
const port = 3000;

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
});

// Add process hook to shutdown pool
process.on('SIGINT', function () {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");
app.get('/', (req, res) => {
    const data = { name: 'Mario' };
    res.render('index', data);
});

app.get('/api/get', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                teammembers.push(query_res.rows[i]);
            }
            const data = { teammembers: teammembers };
            console.log(teammembers);
            res.send(data);
        });
})

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                teammembers.push(query_res.rows[i]);
            }
            const data = { teammembers: teammembers };
            console.log(teammembers);
            res.render('user', data);
        });
});



//get menu items 
//sed result. rows 
//

//in ract use


//run  query inside submits order//need to subract inventory and add order oto order table
//menus IV

//rceecipe from ID to  from menuIV and sellect 
//subtract and from table where inventery Id from to invenry 
// inner JOIN and creat quantiy.invetory   - quanity.menuINV = store as column  

//onclick =() = dels() => dels()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});