const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser=require('body-parser');

app.use(cors());
app.use(express.json());
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM recipe ORDER BY "Recipe_ID" ASC;', (err, result) =>{
            res.send(result.rows);
        });
});
app.use(bodyParser.urlencoded({extended:true}));


app.get('/orderid', (req,res) => {
    pool
        .query('SELECT MAX( \"Order_ID\") +1 FROM orders;', (err, result) => {
            res.send(result.rows);
        })
});


app.get('/linenum', (req,res) => {
    pool
        .query('SELECT MAX( \"Line_Num\") +1 FROM orders;', (err, result) => {
            res.send(result.rows);
            //console.log(result);
        })
});

app.post('/checkout', (req, res) => {

    const Line_Num = req.body.Line_Num;
    const Order_ID = req.body.Order_ID;
    const custName = req.body.Cust_Name;
    const recID = req.body.Recipe_ID;
    const quanity = req.body.orderQuantity;
   
   

    //need to get order number 
    //increment line number everytime

    //console.log(name);
    pool.query('INSERT INTO orders ( \"Line_Num\", \"Order_ID\", \"Cust_Name\", \"Recipe_ID\", \"orderQuantity\", \"Date\") VALUES ( '+Line_Num+', '+Order_ID+',  \''+custName+'\','+recID+','+quanity+', CAST( NOW() AS Date ));', (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            console.log('inserted order');
        }
    });
});






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   
app.set("view engine", "ejs");

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
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

